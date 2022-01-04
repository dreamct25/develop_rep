const { Router } = require("express")
const { dialog } = require("electron")
const route = Router()
const file = require('fs')
const trashBin = require('trash')

route.get("/get_path",(req,res) => {
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory'],
    }).then(({ canceled,filePaths }) => {
        if(!canceled){
            file.readdir(filePaths.join(""),(err,paths) => {
                if(err){
                    console.log(err)
                    res.send(JSON.stringify({ message:"Back End Error"}))
                } else {
                    let arr = []
                    paths.forEach((files,index) => {
                        file.stat(`${filePaths.join("").replace(/\\/g,'/')}/${files}`,(err,fileDetails) => {
                            if(err){
                                console.log(err)
                                res.send(JSON.stringify({ message:"Back End Error"}))
                            } else {
                                arr.push({
                                    fileName:files.split('.')[0],
                                    fileModifyTime:fileDetails.mtime,
                                    fileCreateTime:fileDetails.birthtime,
                                    fileSize:fileDetails.size,
                                    fileType:files.split('.')[1].toLowerCase(),
                                    fileRealPath:`${filePaths.join("").replace(/\\/g,'/')}/${files}`,
                                    fileBasicPath:`${filePaths.join("").replace(/\\/g,'/')}/`
                                })
                            }

                            if(index === paths.length -1) {
                                res.send(JSON.stringify({
                                    message:'success',
                                    searchPath:filePaths.join(""),
                                    searchItem:arr
                                }))
                            }
                        })
                    })
                }
            })
        }
    })
})

route.post("/get_file",(req,res) => {
    file.readdir(req.body.filePath,(err,paths) => {
        if(err){
            console.log(err)
            res.send(JSON.stringify({ message:"Back End Error"}))
        } else {
            let arr = []
            paths.forEach((files,index) => {
                file.stat(`${req.body.filePath.replace(/\\/g,'/')}/${files}`,(err,fileDetails) => {
                    if(err){
                        console.log(err)
                        res.send(JSON.stringify({ message:"Back End Error"}))
                    } else {
                        arr.push({
                            fileName:files.split('.')[0],
                            fileModifyTime:fileDetails.mtime,
                            fileCreateTime:fileDetails.birthtime,
                            fileSize:fileDetails.size,
                            fileType:files.split('.')[1].toLowerCase(),
                            fileRealPath:`${req.body.filePath.replace(/\\/g,'/')}/${files}`,
                            fileBasicPath:`${req.body.filePath.replace(/\\/g,'/')}/`
                        })
                    }

                    if(index === paths.length -1) {
                        res.send(JSON.stringify({
                            message:'success',
                            searchPath:req.body.filePath,
                            searchItem:arr
                        }))
                    }
                })
            })
        }
    })
})

route.post("/rename_file",(req,res) => {
    const { oldName,newName } =  req.body
    file.rename(oldName,newName,(err) => {
        if(err){
            console.log(err)
            res.send(JSON.stringify({ message:'Back End Error' }))
        } else {
            res.send(JSON.stringify({ message:'Rename Success' }))
        }
    })
})

route.post("/delete_file",(req,res) => {
    trashBin([req.body.link]).then(() => {
        res.send(JSON.stringify({ message:'success' }))
    }).catch(err => {
        console.log(err)
        res.send(JSON.stringify({ message:'Back End Error' }))
    })
})

module.exports = route