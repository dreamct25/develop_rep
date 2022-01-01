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

route.post("/add_item",(req,res)=>{
    const { connect,Request } = sql
    connect(sqlConnectSetting,err=>{
        if(err) console.log(err)
        const request = new Request().input("PersonName",req.body.name).input("PersonOld",req.body.old)
        try{
            request.query(`INSERT INTO person VALUES(@PersonName,@PersonOld)`,(err,msg)=>{
                if(err) throw new Error(err)
                res.send({message:"add data success"})
            })
        }catch(errs){
            res.send({message:errs.message})
        }

    })
})

route.post("/update_item",(req,res)=>{
    const { connect,Request } = sql
    connect(sqlConnectSetting,err=>{
        if(err) console.log(err)
        const request = new Request().input("id",req.body.id).input("PersonName",req.body.name).input("PersonOld",req.body.old)
        try{
            request.query(`UPDATE person SET PersonName=@PersonName,PersonOld=@PersonOld WHERE id = @id`,(err,msg)=>{
                if(err) throw new Error(err)
                res.send({message:`update id ${req.body.id} data success`})
            })
        }catch(errs){
            res.send({message:errs.message})
        }
    })
})

route.post("/single_item",(req,res)=>{
    const { connect,Request } = sql
    connect(sqlConnectSetting,err=>{
        if(err) console.log(err)
        const request = new Request().input("id",req.body.id)
        try{
            request.query(`SELECT * FROM person WHERE id = @id`,(err,single)=>{
                if(err) throw new Error(err)
                res.send(single.recordset)
            })
        }catch(errs){
            res.send({message:errs.message})
        }
    })
})

route.post("/delete_item",(req,res)=>{
    const { connect,Request } = sql
    connect(sqlConnectSetting,err=>{
        if(err) console.log(err)
        const request = new Request().input("id",req.body.id)
        try{
            request.query(`DELETE person WHERE id = @id`,(err,single)=>{
                if(err) throw new Error(err)
                res.send({message:`delete id ${req.body.id} data success`})
            })
        }catch(errs){
            res.send({message:errs.message})
        }
    })
})

module.exports = route