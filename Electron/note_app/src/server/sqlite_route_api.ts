import { Request, Response, Router } from "express"
import useSqlite3 from './db_setting'
const route = Router()

interface resDataType {
   message?: string,
   status?: string,
   data?: { [key: string]: any }[]
}

// note_list table CRUD strat

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
   const { textVal, textValCurrentId }: { textVal: string, textValCurrentId: string } = req.body
   useSqlite3(db => {
      db.run("UPDATE note_list SET note_desc = ?,update_date = datetime('now','localtime') WHERE uuid = ?", [textVal, textValCurrentId], (err: Error) => {
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

// note_list table CRUD end

// user_setting table CRUD start

route.get("/get_user_setting", (req: Request, res: Response<resDataType>) => {
   useSqlite3(db => {
      db.all("SELECT * FROM user_setting", (err: Error, resItem: any) => {
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

route.post('/set_user_setting_item', (req: Request, res: Response<{ message: string, status: string }>) => {
   const {
      fontSize,
      fontColor,
      fontStyle,
      fontFamily,
      fontLineHeight,
      typingSpaceBackgroundColor
   }: { [key: string]: any } = req.body

   useSqlite3(db => {
      db.run(`
         INSERT INTO user_setting(
            font_size,
            font_color,
            font_style,
            font_family,
            font_line_height,
            background_color,
            create_date
         ) VALUES(?,?,?,?,?,?,datetime('now','localtime'))`, [
         fontSize,
         fontColor,
         fontStyle,
         fontFamily,
         fontLineHeight,
         typingSpaceBackgroundColor
      ], (err: Error) => {
         res.json({
            message: err ? err.message : 'add success',
            status: err ? 'error' : 'ok'
         })
      })
   })
})

route.post('/update_user_setting_item', (req: Request, res: Response<{ message: string, status: string }>) => {
   const {
      uuid,
      fontSize,
      fontColor,
      fontStyle,
      fontFamily,
      fontLineHeight,
      typingSpaceBackgroundColor
   }: { [key: string]: any } = req.body
   useSqlite3(db => {
      db.run(`
         UPDATE user_setting 
         SET font_size = ?,
         font_color = ?,
         font_style = ?,
         font_family = ?,
         font_line_height = ?,
         background_color = ?,
         update_date = datetime('now','localtime') 
         WHERE uuid = ?`, [
         fontSize,
         fontColor,
         fontStyle,
         fontFamily,
         fontLineHeight,
         typingSpaceBackgroundColor,
         uuid
      ], (err: Error) => {
         res.json({
            message: err ? err.message : 'update success',
            status: err ? 'error' : 'ok'
         })
      })
   })
})

route.post('/update_user_setting_current_window_pos', (req: Request, res: Response<{ message: string, status: string }>) => {
   const {
      uuid,
      posX,
      posY
   }: { [key: string]: any } = req.body
   console.log(uuid, posX, posY)
   useSqlite3(db => {
      db.run(`
         UPDATE user_setting 
         SET window_pos_x = ?,
         window_pos_y = ?,
         update_date = datetime('now','localtime') 
         WHERE uuid = ?`, [
         posX,
         posY,
         uuid
      ], (err: Error) => {
         res.json({
            message: err ? err.message : 'update success',
            status: err ? 'error' : 'ok'
         })
      })
   })
})

route.post('/update_user_setting_current_window_size', (req: Request, res: Response<{ message: string, status: string }>) => {
   const {
      uuid,
      sizeW,
      sizeH
   }: { [key: string]: any } = req.body
   console.log(uuid, sizeW, sizeH)
   useSqlite3(db => {
      db.run(`
         UPDATE user_setting 
         SET window_size_w = ?,
         window_size_h = ?,
         update_date = datetime('now','localtime') 
         WHERE uuid = ?`, [
         sizeW,
         sizeH,
         uuid
      ], (err: Error) => {
         res.json({
            message: err ? err.message : 'update success',
            status: err ? 'error' : 'ok'
         })
      })
   })
})

// user_setting table CRUD end


export default route