import { Request,Response,Router } from "express"
import { Database } from 'sqlite3'
const { sqlite, fileUrl } = require('./db_setting')
const route = Router()

route.get("/items",(req:Request,res:Response<{ message:string }>)=>{
   res.json({ message:'success'})
})


module.exports = route