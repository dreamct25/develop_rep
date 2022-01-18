const { Router } = require("express")
const { sql,sqlConnectSetting } = require('../server_connect')
const route = Router()

route.get("/items",(req,res)=>{
    const { connect,Request } = sql
    connect(sqlConnectSetting,err=>{
        if(err) console.log(err)
        const request = new Request()
        request.query("SELECT * FROM person",(err,get)=>{
            if(err) console.log(err)
            res.send(get.recordset)
        })
    })
})

module.exports = route