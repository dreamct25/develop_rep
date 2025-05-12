const express = require('express')
const models = require('./SqlConnetSetting')
const router =express.Router()

router.get("/order_list/",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request()
        request.query("SELECT * FROM OrderList",(err,get)=>{
            if(err) console.log(err)
            res.send(get.recordset)
        })
    })
})

router.post("/order_list/create",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().
        input("orderAccount",req.body.orderAccount).
        input("orderProductID",req.body.orderProductID).
        input("orderProductSize",req.body.orderProductSize).
        input("orderCount",req.body.orderCount)
        request.query(`
        INSERT INTO OrderList VALUES(
            @orderAccount,
            @orderProductID,
            @orderProductSize,
            @orderCount)`,(err,create)=>{
            if(err) console.log(err)
            res.send(create)
        })
    })
})

router.post("/order_list/delete",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request().input("id",req.body.id)
        request.query("DELETE OrderList WHERE ODID = @id",(err,deletes)=>{
            if(err) console.log(err)
            res.send(deletes)
        })
    })
})

module.exports = router