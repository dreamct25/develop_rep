const multer = require('multer')
const { Router } = require('express')
const trachBin = require('trash')
const fs = require('fs')
const path = require('path')
const os = require('os')
const { path: ffmpegPath } = require('@ffmpeg-installer/ffmpeg');
const { path: ffprobePath } = require('@ffprobe-installer/ffprobe');
const fmg = require('fluent-ffmpeg')
const { createHash } = require('crypto')
const $ = require('../lib/Library.min')
const { PassThrough } = require('stream')

fmg.setFfmpegPath(ffmpegPath)
fmg.setFfprobePath(ffprobePath)

const route = Router()

// set multer
const storage = multer.diskStorage({
    destination:(req,file,cb) => cb(null,req.body.folderUrl), // copy to folder pos
    filename:(req,file,cb) => { // copy file to folder
        const fileType = path.extname(Buffer.from(file.originalname, 'latin1').toString('utf8'))
        const fileName = path.basename(Buffer.from(file.originalname, 'latin1').toString('utf8')).replace(fileType,'')
        cb(null,`${fileName}_${$.formatDateTime({ formatDate:new Date(),formatType:'yyyyMMdd_HHmmss' })}${fileType}`)
    }
})

const uploadFile = multer({ storage })

const getFileHash = path => $.createPromise((resolve, reject) => {
    const hash = createHash('sha256');
    const stream = fs.createReadStream(path);

    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex').substring(0,6)));
    stream.on('error', reject);
})

const getVideoInfo = path => $.createPromise((resolve, reject) => {
    fmg.ffprobe(path, (err, metadata) => {
        if(err){
            reject(err)
            return
        }

        resolve(metadata)
    })
})

const fmgIsAvailableEncoders = () => $.createPromise((resolve, reject) => {
    fmg.getAvailableEncoders((err, encoders) => {
        if (err) {
            reject(err);
            return;
        }

        if (encoders['h264_nvenc']) resolve(true);
        else resolve(false);
    })
})

const fmgConvertStartHandler = (req, res, resultHandleFileName, commandLine) => {
    console.log(`start convert: ${commandLine}`);

    req.app.set('is_converting', resultHandleFileName)

    res.status(200).write(
        `data: ${JSON.stringify({
            message: 'start_convert'
        })}\n\n`
    )
}

const fmgConvertProcessingHandler = (res, startTransTime, videoDuration, progress) => {
    const [h, m, s] = progress.timemark.split(':').map(parseFloat);
    const currentSeconds = h * 3600 + m * 60 + s;
    const percent = (currentSeconds / videoDuration) * 100;

    const spendTime = (+new Date() - startTransTime) / 1000

    const remainingTime = spendTime / (percent / 100) - spendTime

    console.log(`Processing: ${percent.toFixed(2)}%`);

    res.status(200).write(
        `data: ${JSON.stringify({
            message: 'progress', 
            result: {
                convertPer: percent.toFixed(2),
                remaining: Math.abs(parseFloat(remainingTime.toFixed(0)))
            }
        })}\n\n`
    )
}

const fmgConvertEndHandler = (req, res, resultHandleFileName) => {
    console.log('Processing finished successfully');

    req.app.set('is_converting', '')

    res.status(200).write(
        `data: ${JSON.stringify({
            message: 'success', 
            result: { fileName: resultHandleFileName }
        })}\n\n`
    )

    res.end()
}

const fmgConvertErrorHandler = (err, stdout, stderr) => {
    console.error(`Error: ${err.message}`);
    console.error(`ffmpeg stdout: ${stdout}`);
    console.error(`ffmpeg stderr: ${stderr}`);
}

route.get('/check_setting_exist',async (req,res) => {
    const settingPath = path.join(__dirname.replace('apis','').replace('src', ''),`/usr/setting`)

    try {

        if(!fs.existsSync(settingPath)){
            throw new Error('empty')
        }

        const readFile = await fs.promises.readFile(settingPath,'utf8')

        const context = JSON.parse(
            decodeURIComponent(
                Buffer.from(readFile, 'base64').toString()
            )
        )

        if(!fs.existsSync(context.upload_url)) fs.mkdirSync(context.upload_url,{ recursive:true })

        req.app.set('upload_url',context.upload_url)

        res.status(200).json({ message: 'success' })

    } catch (err) {
        res.status(500).json({ message: err.message || err })
    }
})

route.post('/create_setting',async (req,res) => {
    
    if(req.body.u){

        try {
            const settingPath = path.join(__dirname.replace('apis','').replace('src',''),`usr/setting`)
            const settingDirPath = path.join(__dirname.replace('apis','').replace('src',''),'usr')

            if(!fs.existsSync(settingDirPath)) await fs.promises.mkdir(settingDirPath,{ recursive: true })

            const usingPath = decodeURIComponent(
                Buffer.from(req.body.u, 'base64').toString()
            )

            const json = JSON.stringify({
                upload_url: usingPath
            })

            if(fs.existsSync(settingPath)){
                const readFile = await fs.promises.readFile(settingPath,'utf8')

                const context = JSON.parse(
                    decodeURIComponent(
                        Buffer.from(readFile, 'base64').toString()
                    )
                )

                context.upload_url = usingPath

                const encode = Buffer.from(encodeURIComponent(JSON.stringify(context))).toString('base64')

                if(!fs.existsSync(context.upload_url)) {
                    throw new Error('no found')
                }
                
                await fs.promises.writeFile(settingPath,encode,'utf8')
    
                req.app.set('upload_url',context.upload_url)
            } else {
                if(!fs.existsSync(usingPath)) {
                    throw new Error('no found')
                }

                const encode = Buffer.from(encodeURIComponent(json)).toString('base64')

                await fs.promises.writeFile(settingPath,encode,'utf8')

                const readFile = await fs.promises.readFile(settingPath,'utf8')

                const context = JSON.parse(
                    decodeURIComponent(
                        Buffer.from(readFile, 'base64').toString()
                    )
                )
    
                req.app.set('upload_url',context.upload_url)
            }

            res.status(200).json({ message: 'success' })
        } catch (err) {
            res.status(500).json({ message: err.message || err })
        }
    }
})

route.get('/get_remote_ip',(req,res) => {
    const ipconfig = os.networkInterfaces()
    let addressIp = ''

    for (const devName in ipconfig) {
        const netList = ipconfig[devName];
        
        for (let i = 0; i < netList.length; i++) {
            if(netList[i]){
                const { address, family, internal } = netList[i]
                if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                    addressIp = address;
                    break;
                }
            }
        }
    }

    if(req.query?.r === 's'){
        res.status(200).send(`${addressIp}:19621`)
        return
    }

    res.status(200).json({
        currentIp:`http://${addressIp}:19621`,
        isLocal: req.hostname === 'localhost'
    })
})

// upload file api
route.post('/upload_file',uploadFile.array('files'),(req,res) => res.json({ message:'uploadStatus.uploaded' }))

// get upload dictionary api
route.post('/get_upload_dirs',async (req,res) => {

    const defaultUploadFolderUrl = req.app.get('upload_url')

    const goFolderUrl = decodeURIComponent(
        Buffer.from(req.body.folderUrl, 'base64').toString()
    )

    const useFolderUrl = goFolderUrl || defaultUploadFolderUrl

    const files = await fs.promises.readdir(useFolderUrl)

    const imgRegExp = new RegExp('^.*\.(jpg|JPG|gif|GIF|jpeg|JPEG|png|PNG|TIFF|tiff|mp4|MP4|mkv|MKV|mpeg|MPEG|mov|MOV)$')

    const data = $.maps(files,fileName => {
        const { ctime,atime } = fs.statSync(`${useFolderUrl}/${fileName}`)
        
        return {
            fileName,
            fileUrl: path.join(useFolderUrl,fileName),
            fileCreateTime:atime,
            isFolder:path.extname(fileName) === '',
            fileType:path.extname(fileName) === '' ? '.folder' : path.extname(fileName),
            fileLoadStatus: imgRegExp.test(path.extname(fileName) === '' ? '.folder' : path.extname(fileName)) ? false : null
        }
    })

    res.status(200).json({ data,useFolderUrl })
})

// change dictionary api
route.post('/cd_dir',async (req,res) => {
    const url = decodeURIComponent(
        Buffer.from(req.body.dir, 'base64').toString()
    )

    const files = await fs.promises.readdir(url)

    const imgRegExp = new RegExp('^.*\.(jpg|JPG|gif|GIF|jpeg|JPEG|png|PNG|TIFF|tiff|mp4|MP4|mkv|MKV|mpeg|MPEG|mov|MOV)$')

    const data = $.maps(files,fileName=> {
        
        const { birthtime } = fs.statSync(path.join(url,fileName))

        return {
            fileName,
            fileUrl:path.join(url,fileName),
            fileCreateTime:birthtime,
            isFolder:path.extname(fileName) === '',
            fileType:path.extname(fileName) === '' ? '.folder' : path.extname(fileName),
            fileLoadStatus: imgRegExp.test(path.extname(fileName) === '' ? '.folder' : path.extname(fileName)) ? false : undefined
        }
    })

    res.status(200).json({ data })
})

// create folder api
route.post('/create_dir',async (req,res) => {
    const { folderName,folderUrl } = req.body

    const path = decodeURIComponent(
        Buffer.from(folderUrl, 'base64').toString()
    )

    await fs.promises.mkdir(`${path}/${folderName}`)

    res.status(200).json({ message:'success' })
})

// rename folder or file api
route.post('/rename',async (req,res) => {
    const { oldName,newName,url } = req.body

    const path = decodeURIComponent(
        Buffer.from(url, 'base64').toString()
    )

    await fs.promises.rename(`${path}/${oldName}`,`${path}/${newName}`)

    res.status(200).json({ message:'success' })
})

// delete file api
route.post('/delete_file',async (req, res) => {
    const { url } = req.body

    const path = decodeURIComponent(
        Buffer.from(url, 'base64').toString()
    )
    
    await trachBin(path)

    res.status(200).json({ message:'success' })
})

route.get('/is_convert_exsited',async (req, res) => {

    const usingPath = decodeURIComponent(
        Buffer.from(req.query.f, 'base64').toString()
    )

    const fileExtend = path.extname(usingPath)

    const fileName = path.basename(usingPath).replace(fileExtend,'').replace(/\s/g, '')

    const saveName = await getFileHash(usingPath)

    const outputPath = path.join(__dirname.replace('apis','').replace('src', ''),`cache/.m3u8_list/${saveName}_0/${saveName}_output.m3u8`)

    
    const getIsConvertingFileName = req.app.get('is_converting')
    
    if(fs.existsSync(outputPath)){

        if(getIsConvertingFileName === `${fileName}${fileExtend}`) {

            res.status(200).json({
                message: 'is_converting',
                result: { fileName: getIsConvertingFileName }
            })

            return
        }

        res.status(200).json({
            message: 'success', 
            result: encodeURIComponent(
                Buffer.from(`/stream/${saveName}_0/${saveName}_output.m3u8`).toString('base64')
            ) 
        })
        
        return
    }

    if(getIsConvertingFileName) {

        res.status(200).json({
            message: 'is_converting',
            result: { fileName: getIsConvertingFileName }
        })

        return
    }

    res.status(200).json({
        message: 'not_exsited'
    })
})

route.get('/convert',async (req,res) => {

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const usingPath = decodeURIComponent(
        Buffer.from(req.query.f, 'base64').toString()
    )

    const fileExtend = path.extname(usingPath)

    const fileName = path.basename(usingPath).replace(fileExtend,'').replace(/\s/g, '')

    const saveName = await getFileHash(usingPath)

    const outputPath = path.join(__dirname.replace('apis','').replace('src', ''),`cache/.m3u8_list/${saveName}_0/${saveName}_output.m3u8`)

    const tsFilePath = path.join(__dirname.replace('apis','').replace('src', ''),`cache/.m3u8_list/${saveName}_%v/v%03d.ts`)

    const videoInfo = await getVideoInfo(usingPath)

    const videoDuration = videoInfo.format.duration

    const startTransTime = +new Date()

    const resultHandleFileName = `${fileName}${fileExtend}`

    const isAvailableEncoders = await fmgIsAvailableEncoders()

    // set HLS options
    fmg(usingPath)
    .videoCodec(isAvailableEncoders ? 'h264_nvenc' : 'libx264')
    .audioCodec('copy')
    .outputOptions([
        '-rc vbr_hq',          // 可變比特率高品質
        // '-c:a aac',          // audio code
        '-hls_time 5',         // split every 5 sec in hls
        '-hls_list_size 0',    // playlist keep all
        '-f hls',              // HLS format
        `-hls_segment_filename ${tsFilePath}`
    ])
    .output(outputPath)
    .on('start', fmgConvertStartHandler.bind(this, req, res, resultHandleFileName))
    .on('progress', fmgConvertProcessingHandler.bind(this, res, startTransTime, videoDuration))
    .on('end', fmgConvertEndHandler.bind(this, req, res, resultHandleFileName))
    .on('error', fmgConvertErrorHandler)
    .run();
})

route.get('/preview_v',async (req,res) => {

    res.type('image/jpeg');

    const usingPath = decodeURIComponent(
        Buffer.from(req.query.f, 'base64').toString()
    )

    fmg(usingPath)
      .inputOptions(['-ss 5']) // get 5 sec's video screenshot
      .outputOptions([
        "-vframes 1",     // 只取一幀
        "-f image2pipe",  // output to image stream
        "-vcodec mjpeg"     // convert screenshot to jpeg
      ])
      .format("image2pipe")
      .on("error", (err) => console.log(err))
      .on("end", () => console.log('end'))
      .pipe(res, { end: true });
})

module.exports = route