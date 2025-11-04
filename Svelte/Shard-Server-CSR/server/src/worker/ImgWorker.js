const imgConvert = require('sharp')
const fs = require('fs')
const path = require('path')
const { threadProcessHandler } = require('./MultipleTask.js')

const imgsTypeFilter = ['.tiff','.TIF', '.bmp', 'jpeg']

threadProcessHandler(async (data) => {
    let buffer = undefined

    const usingPath = data.usingPath

    const read = await fs.promises.readFile(usingPath)

    const files = await imgConvert(read,  { failOn: 'error' })

    const isNotJPG = imgsTypeFilter.includes(path.extname(usingPath))

    if(data?.scale) await files.resize({ width: 200 })

    if(data?.full) {
        buffer = isNotJPG ? await files.rotate().toFormat('jpeg').toBuffer() : read
    } else {
        buffer = await files.rotate().toFormat('jpeg',{ mozjpeg: true }).toBuffer()
    }

    return { result: buffer }
})