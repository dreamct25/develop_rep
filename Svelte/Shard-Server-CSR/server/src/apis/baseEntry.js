const { Router, static: SiteStaticFileReader } = require('express')
const fs = require('fs')
const path = require('path')
const chardet = require('chardet')
const iconv = require('iconv-lite')
const { MultipleThreads } = require('../worker/MultipleWorkerPool')

const route = Router()

// create base static public folder to read
route.use('/stream',SiteStaticFileReader(path.join(__dirname.replace('apis','').replace('src', ''), 'cache/.m3u8_list')));

// download file api
route.use('/download',async (req, res) => {
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
route.use('/preview',async (req, res) => {
    const usingPath = decodeURIComponent(
        Buffer.from(req.query.f, 'base64').toString()
    )

    const pool = new MultipleThreads(path.join(__dirname.replace('apis',''), 'worker', 'ImgWorker.js'))

    const runObj = { usingPath }

    if(Boolean(req.query?.scale)) runObj.scale = true

    if(Boolean(req.query?.full)) runObj.full = true

    const imgBuffer = await pool.run(runObj)

    pool.destroy()

    res.end(imgBuffer)
})

route.use('/preview_doc',async (req, res) => {
    const usingPath = decodeURIComponent(
        Buffer.from(req.query.f, 'base64').toString()
    )

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    try {
        const contentBuffer = await fs.promises.readFile(usingPath);
        
        const content = iconv.decode(contentBuffer, 'utf-8');

        const encoding = !new RegExp('[一-龥]').test(content) ? iconv.decode(contentBuffer, 'big5') : content;

        res.status(200).send(encoding);
    } catch (err) {
        console.error(err);
        res.status(500).send('讀取失敗');
    }
})

route.use('/',SiteStaticFileReader(path.join(__dirname.replace('server','').replace('src','').replace('apis',''),'/client')))

module.exports = route