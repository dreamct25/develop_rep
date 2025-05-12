const express = require('express')
const models = require('./SqlConnetSetting')
const router =express.Router()

router.get("/cart/",(req,res)=>{
    models.sql.connect(models.connectObject,err=>{
        if(err) console.log(err)
        const request = new models.sql.Request()
        request.query(`
        SELECT
        orders.ODID,
        orders.Account,
        products.PDName,
        products.PDID,
        orders.ODPDSize,
        orders.ODPDCount,
        products.PDOnSalePrice,
        products.PDImgUrlI 
        FROM Product products JOIN OrderList orders 
        On products.PDID = orders.PDID
        `,(err,get)=>{
            if(err) console.log(err)
            res.send(get.recordset)
        })
    })
})

module.exports = router