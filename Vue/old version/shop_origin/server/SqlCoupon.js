const express = require('express')
const models = require('./SqlConnetSetting')
const router =express.Router()

router.get("/coupon/",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request()
        request.query("SELECT * FROM Coupon",(err,get)=>{
            if(err) console.log(err)
            res.send(get.recordset)
        })
    })
})

router.post("/coupon/create",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().
        input("couponName",req.body.couponName).
        input("couponCode",req.body.couponCode).
        input("couponPercent",req.body.couponPercent).
        input("couponAddDate",req.body.couponAddDate).
        input("couponEnableDate",models.trans(req.body.couponEnableDate)).
        input("couponDisableDate",models.trans(req.body.couponDisableDate)).
        input("couponStatus",req.body.couponStatus)
        request.query(`
        INSERT INTO Coupon VALUES(
            @couponName,
            @couponCode,
            @couponPercent,
            @couponAddDate,
            @couponEnableDate,
            @couponDisableDate,
            @couponStatus)`,(err,create)=>{
            if(err) console.log(err)
            res.send(create)
        })
    })
})

router.post("/coupon/patch",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().
        input("couponName",req.body.couponName).
        input("couponCode",req.body.couponCode).
        input("couponPercent",req.body.couponPercent).
        input("couponEnableDate",models.trans(req.body.couponEnableDate)).
        input("couponDisableDate",models.trans(req.body.couponDisableDate)).
        input("couponStatus",req.body.couponStatus).
        input("id",req.body.id)
        request.query(`
        UPDATE Coupon
        SET CPName = @couponName,
            CPCode = @couponCode,
            CPPercent = @couponPercent,
            CPEnableDate = @couponEnableDate,
            CPDisableDate = @couponDisableDate,
            CPState = @couponStatus
        WHERE CPID = @id`,(err,patch)=>{
            if(err) console.log(err)
            res.send(patch)
        })
    })
})

router.post("/coupon/delete",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().input("id",req.body.id)
        request.query("DELETE Coupon WHERE CPID = @id",(err,deletes)=>{
            if(err) console.log(err)
            res.send(deletes)
        })
    })
})

router.post("/coupon/get_single_coupon",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().input("id",req.body.id)
        request.query("SELECT * FROM Coupon WHERE CPID = @id",(err,get)=>{
            if(err) console.log(err)
            res.send(get.recordset)
        })
    })
})

module.exports = router