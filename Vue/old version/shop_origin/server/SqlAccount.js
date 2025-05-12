const express = require('express')
const models = require('./SqlConnetSetting')
const router =express.Router()
router.get("/account",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request()
        request.query("SELECT * FROM Account",(err,get)=>{
            if(err) console.log(err)
            res.send(get.recordset)
        })
    })
})

router.post("/account/register",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().
        input("name",req.body.name).
        input("account",req.body.account).
        input("password",req.body.password).
        input("tel",req.body.tel).
        input("email",req.body.email).
        input("address",req.body.address).
        input("time",req.body.time)
        request.query(`
        INSERT INTO Account VALUES(
            @name,
            @account,
            @password,
            @tel,
            @email,
            @address,
            @time,0,0)`,(err,create)=>{
                if(err) console.log(err)
                res.send(create)
            })
    })
})

router.post("/account/login",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().input("id",req.body.id)
        request.query(`
        UPDATE Account
        SET LoginState = 1
        WHERE id = @id`,(err,update)=>{
            if(err) console.log(err)
            res.send(update)
        })
    })
})

router.post("/account/login_off",(req,res)=>{
    models.sql.model.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().input("id",req.body.id)
        request.query(`
        UPDATE Account
        SET LoginState = 0
        WHERE id = @id`,(err,update)=>{
            if(err) console.log(err)
            res.send(update)
        })
    })
})

module.exports = router