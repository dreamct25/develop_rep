const express = require('express')
const models = require('./SqlConnetSetting')
const router =express.Router()

router.get("/payment/",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request()
        request.query("SELECT * FROM Payment",(err,get)=>{
            if(err) console.log(err)
            res.send(get.recordset)
        })
    })
})
router.post("/payment/create",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().
        input("paymentNum",req.body.paymentNum).
        input("paymentName",req.body.paymentName).
        input("paymentTel",req.body.paymentTel).
        input("paymentEmail",req.body.paymentEmail).
        input("paymentAddress",req.body.paymentAddress).
        input("payMethod",req.body.payMethod).
        input("paymentCouponUse",req.body.paymentCouponUse).
        input("paymentCouponID",req.body.paymentCouponID).
        input("payStatus",req.body.payStatus).
        input("createDate",req.body.createDate)
        request.query(`
        INSERT INTO Payment VALUES(
            @paymentNum,
            @paymentName,
            @paymentTel,
            @paymentEmail,
            @paymentAddress,
            @payMethod,
            @paymentCouponUse,
            @paymentCouponID,
            @payStatus,
            @createDate)`,(err,create)=>{
            if(err) console.log(err)
            res.send(create)
        })
    })
})
router.post("/payment/paied",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().
        input("payStatus",req.body.payStatus).
        input("id",req.body.id)
        request.query(`
        UPDATE Payment
        SET PMState = @payStatus
        WHERE PMID = @id`,(err,paied)=>{
            if(err) console.log(err)
            res.send(paied)
        })
    })
})
router.post("/payment/delete",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().input("id",req.body.id)
        request.query("DELETE Payment WHERE PMID = @id",(err,deletes)=>{
            if(err) console.log(err)
            res.send(deletes)
        })
    })
})

module.exports = router