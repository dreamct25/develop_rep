import { Router,Request,Response } from 'express'

const apiRoute = Router()

apiRoute.get('/',(req:Request,res:Response<{ message:string }>) => res.json({ message:'Hello API !' }))

export default apiRoute