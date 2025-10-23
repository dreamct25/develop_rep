const multer = require('multer')
const { Router } = require('express')
const trachBin = require('trash')
const fs = require('fs')
const path = require('path')
const os = require('os')
const { path: ffmpegPath } = require('@ffmpeg-installer/ffmpeg');
const fmg = require('fluent-ffmpeg')
const { exec } = require('child_process');
const $ = require('../lib/Library.min')

// const folderUrl = process.env.UPLOAD_URL

// check folder is exists if not exists then create folder at reference path
// !fs.existsSync(folderUrl) && fs.mkdirSync(folderUrl,{ recursive:true })

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

route.get('/check_setting_exist',async (req,res) => {
    const settingPath = path.join(__dirname.replace('apis',''),`usr/setting`)

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
        res.status(500).json({ message: err?.message || error })
    }
})

route.post('/create_setting',async (req,res) => {
    
    if(req.body.u){

        try {
            const settingPath = path.join(__dirname.replace('apis',''),`usr/setting`)
            const settingDirPath = path.join(__dirname.replace('apis',''),'usr')

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
            res.status(500).json({ message: err?.message || err })
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

    const useFolderUrl = req.body.folderUrl || defaultUploadFolderUrl

    const files = await fs.promises.readdir(useFolderUrl)

    const imgRegExp = new RegExp('^.*\.(jpg|JPG|gif|GIF|jpeg|JPEG|png|PNG|TIFF|tiff)$')

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
    const url = req.body.dir

    const files = await fs.promises.readdir(url)

    const imgRegExp = new RegExp('^.*\.(jpg|JPG|gif|GIF|jpeg|JPEG|png|PNG|TIFF|tiff)$')

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

    await fs.promises.mkdir(`${folderUrl}/${folderName}`)

    res.status(200).json({ message:'success' })
})

// rename folder or file api
route.post('/rename_dir',async (req,res) => {
    const { oldFolderName,newFolderName,folderUrl } = req.body

    await fs.promises.rename(`${folderUrl}/${oldFolderName}`,`${folderUrl}/${newFolderName}`)

    res.status(200).json({ message:'success' })
})

// delete file api
route.post('/delete_file',async (req,res) => {
    const { folderUrl } = req.body
    
    await trachBin(`${folderUrl}`)

    res.status(200).json({ message:'success' })
})

route.get('/convert',async (req,res) => {
    const usingPath = decodeURIComponent(
        Buffer.from(req.query.f, 'base64').toString()
    )

    const fmgN = new fmg()

    fmgN.setFfmpegPath(ffmpegPath)

    const fileExtend = path.extname(usingPath)

    const fileName = path.basename(usingPath).replace(fileExtend,'').replace(/\s/g, '')

    const saveName = Buffer.from(fileName).toString('base64').substring(0,8)

    const outputPath = path.join(__dirname.replace('apis',''),`.m3u8_list/${saveName}_0/${saveName}_output.m3u8`)
    
    if(fs.existsSync(outputPath)){
        res.status(200).json({ 
            message: 'success', 
            result: encodeURIComponent(
                Buffer.from(`/stream/${saveName}_0/${saveName}_output.m3u8`).toString('base64')
            ) 
        })
        
        return
    }
 
    // 設定不同比特率的規格
    const bitrates = [
        // { resolution: '426x240', bitrate: '400k' },
        // { resolution: '640x360', bitrate: '700k' },
        { resolution: '1280x720', bitrate: '2800k' },
        // { resolution: '1920x1080', bitrate: '5000k' }
    ];

    // 添加輸入文件
    fmgN.addInput(usingPath);

    // 設定輸出選項
    // bitrates.forEach((rate, index) => {
    //     fmgN.outputOptions([
    //         `-s:v:${index} ${rate.resolution}`,
    //         `-c:v:${index} libx264`,
    //         `-b:v:${index} ${rate.bitrate}`,
    //         `-c:a:${index} aac`,
    //         `-b:a:${index} 128k`
    //     ]);
    // });

    const tsFilePath = path.join(__dirname.replace('apis',''),`.m3u8_list/${saveName}_%v/v%03d.ts`)

    // 設定 HLS 相關選項
    fmgN.outputOptions([
        // '-vf scale_npp=1920:1080',
        '-c:v h264_nvenc',
        // '-b:v 5M',
        // ...['.mkv'].includes(fileExtend) ? ['-c:a: ac3'] : [],
        // '-b:a: 320k',
        '-f hls',
        '-hls_time 30',
        '-hls_playlist_type vod',
        '-hls_list_size 0',
        `-hls_segment_filename ${tsFilePath}`
    ])
    .output(outputPath)
    // .on('start', function(commandLine) {
    //     console.log('Spawned FFmpeg with command: ' + commandLine);
    // })
    // .on('progress', function(progress) {
    //     console.log('Processing: ' + progress.percent + '% done');
    // })
    .on('end', function() {
        console.log('Processing finished successfully');

        res.status(200).json({ 
            message: 'success', 
            result: encodeURIComponent(
                Buffer.from(`/stream/${saveName}_0/${saveName}_output.m3u8`).toString('base64')
            ) 
        })
    })
    .on('error', function(err, stdout, stderr) {
        console.error('Error: ' + err.message);
        console.error('ffmpeg stdout: ' + stdout);
        console.error('ffmpeg stderr: ' + stderr);
    })
    .run();

    // fmgN.addInput(usingPath).outputOptions([
    //     '-map 0:0',
    //     '-map 0:1',
    //     '-map 0:0',
    //     '-map 0:1',
    //     '-s:v:0 2160x3840',
    //     '-c:v:0 libx264',
    //     '-b:v:0 2000k',
    //     '-s:v:1 960x540',
    //     '-c:v:1 libx264',
    //     '-b:v:1 365k',
    //     // '-var_stream_map', '"v:0,a:0 v:1,a:1"',
    //     '-master_pl_name master.m3u8',
    //     '-f hls',
    //     '-max_muxing_queue_size 1024',
    //     '-hls_time 1',
    //     '-hls_list_size 0',
    //     '-hls_segment_filename', 'v%v/fileSequence%d.ts'
    // ]).output('./video.m3u8')
    //     .on('start', function (commandLine) {
    //         console.log('Spawned Ffmpeg with command: ' + commandLine);
    //     })
    //     .on('error', function (err, stdout, stderr) {
    //         console.log('An error occurred: ' + err.message, err, stderr);
    //     })
    //     .on('progress', function (progress) {
    //         console.log('Processing: ' + progress.percent + '% done')
    //     })
    //     .on('end', function (err, stdout, stderr) {
    //         res.status(200).json({ message: 'aaaa' })
    //         console.log('Finished processing!' /*, err, stdout, stderr*/)
    //     })
    //     .run()
})

module.exports = route