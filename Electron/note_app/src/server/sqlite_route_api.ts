import { Request, Response, Router } from "express"
import useSqlite3 from './db_setting'
const route = Router()

interface resDataType {
   message?: string,
   status?: string,
   data?: { [key: string]: any }[]
}

route.get("/get_note_list", (req: Request, res: Response<resDataType>) => {
   useSqlite3(db => {
      db.all("SELECT * FROM note_list", (err: Error, resItem: any) => {
         let resData: resDataType
         if (err) {
            resData = {
               message: err.message,
               status: 'error',
               data: null
            }
         } else {
            resData = {
               message: 'excute success',
               status: 'ok',
               data: resItem
            }
         }

         res.json(resData)
      })
   })
})

route.post('/set_note_list_item', (req: Request, res: Response<{ message: string, status: string }>) => {
   const { textVal }: { textVal: string } = req.body
   useSqlite3(db => {
      db.run("INSERT INTO note_list(note_desc,create_date) VALUES(?,datetime('now','localtime'))", [textVal], (err: Error) => {
         res.json({
            message: err ? err.message : 'add success',
            status: err ? 'error' : 'ok'
         })
      })
   })
})

route.post('/update_note_list_item', (req: Request, res: Response<{ message: string, status: string }>) => {
   const { textVal,textValCurrentId }: { textVal: string,textValCurrentId:string } = req.body
   useSqlite3(db => {
      db.run("UPDATE note_list SET note_desc = ? WHERE uuid = ?", [textVal,textValCurrentId], (err: Error) => {
         res.json({
            message: err ? err.message : 'update success',
            status: err ? 'error' : 'ok'
         })
      })
   })
})

route.post('/delete_note_list_item', (req: Request, res: Response<{ message: string, status: string }>) => {
   const { uuid }: { uuid: number } = req.body
   useSqlite3(db => {
      db.run("DELETE FROM note_list WHERE uuid = ?", uuid, (err: Error) => {
         res.json({
            message: err ? err.message : 'delete success',
            status: err ? 'error' : 'ok'
         })
      })
   })
})


export default route