const { Router,static: SiteStaticFileReader } = require('express')
const fs = require('fs')
const imgConvert = require('jimp')
const path = require('path')

const route = Router()

// create base static public folder to read
route.use('/stream',SiteStaticFileReader(path.join(__dirname.replace('apis',''), '.m3u8_list')));

// download file api
route.use('/download',async (req,res) => {
    const usingPath = decodeURIComponent(
        Buffer.from(req.query.f, 'base64').toString()
    )
    const fileName = path.basename(usingPath)
    const { size } = await fs.promises.stat(usingPath)
    const readFile = fs.createReadStream(usingPath)

    res.set({
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
	'Content-Type': 'application/octet-stream',
        'Content-Length': size
    });
    
    readFile.pipe(res)
})

// preview file api
route.use('/preview',async (req,res) => {
    const usingPath = decodeURIComponent(
        Buffer.from(req.query.f, 'base64').toString()
    )

    if(['.tiff','.TIF'].includes(path.extname(usingPath))){
        const files = await imgConvert.read(usingPath)

        files.getBuffer(imgConvert.MIME_JPEG,(err,bufferTemp) => {
            const buffer = Buffer.from(bufferTemp);
            res.end(buffer);
        })

        return
    }
    
    const imgBuffer = await fs.promises.readFile(usingPath);

    res.end(imgBuffer);
})

route.use('/',SiteStaticFileReader(path.join(__dirname.replace('\\server\\apis',''),'/client')))

module.exports = route