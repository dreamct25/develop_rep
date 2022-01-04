const { Router } = require("express")
const route = Router()
const { PythonShell } = require('python-shell')

route.get("/items",(req,res)=>{
    PythonShell.run('./python/invoice_number.py', {}, (err, data) => {
        if(err){
            console.log(err)
            res.send("Back End Error")
        }else{
            res.send(data.join(""))
        }
    })
})

route.get("/get_some",(req,res)=>{
    PythonShell.run('./python/test.py', {}, (err, data) => {
        if(err){
            console.log(err)
            res.send("Back End Error")
        }else{
            res.send(JSON.stringify({ text:data.join("")}))
        }
    })
})

module.exports = route