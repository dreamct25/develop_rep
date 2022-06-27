const express = require('express')
const models = require('./SqlConnetSetting')
const router =express.Router()

router.get("/product/",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request()
        request.query("SELECT * FROM Product",(err,get)=>{
            if(err) console.log(err)
            res.send(get.recordset)
        })
    })
})

router.post("/product/create",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().
        input("productName",req.body.productName).
        input("productDescript",req.body.productDescript).
        input("productTypeName",req.body.productTypeName).
        input("productTypeNum",req.body.productTypeNum).
        input("productNew",req.body.productNew).
        input("productPice",req.body.productPice).
        input("productOriginPrice",req.body.productOriginPrice).
        input("productOnSalePrice",req.body.productOnSalePrice).
        input("productStatus",req.body.productStatus).
        input("productAddDate",req.body.productAddDate).
        input("productOnDate",models.trans(req.body.productOnDate)).
        input("productOffDate",models.trans(req.body.productOffDate)).
        input("productMainImg",req.body.productMainImg).
        input("productOtherImgI",models.trans(req.body.productOtherImgI)).
        input("productOtherImgII",models.trans(req.body.productOtherImgII))
        input("productMainImgDesc",req.body.productMainImgDesc).
        input("productOtherImgDescI",models.trans(req.body.productOtherImgDescI)).
        input("productOtherImgDescII",models.trans(req.body.productOtherImgDescII))
        request.query(`
        INSERT INTO Product VALUES(
            @productName,
            @productDescript,
            @productTypeName,
            @productTypeNum,
            @productNew,
            @productPice,
            @productOriginPrice,
            @productOnSalePrice,
            @productStatus,
            @productAddDate,
            @productOnDate,
            @productOffDate,
            @productMainImg,
            @productOtherImgI,
            @productOtherImgII,
            @productMainImgDesc,
            @productOtherImgDescI,
            @productOtherImgDescII)`,(err,create)=>{
            if(err) console.log(err)
            res.send(create)
        })
    })
})

router.post("/product/patch",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().
        input("productName",req.body.productName).
        input("productDescript",req.body.productDescript).
        input("productTypeNum",req.body.productTypeNum).
        input("productNew",req.body.productNew).
        input("productPice",req.body.productPice).
        input("productOriginPrice",req.body.productOriginPrice).
        input("productOnsalePrice",req.body.productOnsalePrice).
        input("productStatus",req.body.productStatus).
        input("productOnDate",models.trans(req.body.productOnDate)).
        input("productOffDate",models.trans(req.body.productOffDate)).
        input("productMainImg",req.body.productMainImg).
        input("productOtherImgI",models.trans(req.body.productOtherImgI)).
        input("productOtherImgII",models.trans(req.body.productOtherImgII)).
        input("productMainImgDesc",req.body.productMainImgDesc).
        input("productOtherImgDescI",models.trans(req.body.productOtherImgDescI)).
        input("productOtherImgDescII",models.trans(req.body.productOtherImgDescII)).
        input("id",req.body.id)
        request.query(`
        UPDATE Product
        SET PDName = @productName,
            PDDesc = @productDescript,
            PDTypeNum = @productTypeNum,
            PDIsNew = @productNew,
            PDPice = @productPice,
            PDOriginPrice = @productOriginPrice,
            PDOnSalePrice = @productOnsalePrice,
            PDState = @productStatus,
            PDOnDate = @productOnDate,
            PDOffDate = @productOffDate,
            PDImgUrlI = @productMainImg,
            PDImgUrlII = @productOtherImgI,
            PDImgUrlIII = @productOtherImgII,
            PDImgDescI = @productMainImgDesc,
            PDImgDescII = @productOtherImgDescI,
            PDImgDescIII = @productOtherImgDescII
        WHERE PDID = @id`,(err,patch)=>{
            if(err) console.log(err)
            res.send(patch)
        })
    })
})

router.post("/product/delete",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().input("id",req.body.id)
        request.query("DELETE Product WHERE PDID = @id",(err,deletes)=>{
            if(err) console.log(err)
            res.send(deletes)
        })
    })
})

router.post("/product/patch_total_pice",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().
        input("productPice",req.body.productPice).
        input("id",req.body.id)
        request.query(`
        UPDATE Product
        SET PDPice = @productPice
        WHERE PDID = @id`,(err,patch)=>{
            if(err) console.log(err)
            res.send(patch)
        })
    })
})

router.post("/product/get_single_product",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().input("id",req.body.id)
        request.query(`SELECT * FROM Product WHERE PDID = @id`,(err,get)=>{
            if(err) console.log(err)
            res.send(get.recordset)
        })
    })
})

module.exports = router