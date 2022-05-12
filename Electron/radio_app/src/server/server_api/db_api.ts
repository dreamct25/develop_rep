import { Request, Response, Router } from "express"
import useSqlite from "../db_setting"

const route: Router = Router()

// Sqlite3 demo CRD
// select all data
route.get("/get_collect_item", (req: any, res: any) => {
    useSqlite(db => {
        db.all("SELECT * FROM radio_collect_list", (err: Error, data: any) => {
            if (err) {
                res.json({ message: err.message })
            } else {
                res.json(data)
            }
            db.close()
        })
    })

})

// add item
route.post("/add_item", (req: Request, res: Response) => {
    const {
        radio_name,
        radio_img_url
    }: {
        radio_name: string,
        radio_img_url: string
    } = req.body

    useSqlite(db => {
        db.run(`INSERT INTO radio_collect_list (radio_name,radio_img_url,create_date) VALUES(?,?,datetime('now','localtime'))`, [radio_name, radio_img_url], (err?: { [key: string]: any }) => {
            if (err === null) {
                res.json({ message: 'add success' })
            } else {
                res.json({ message: err.code })
            }
        })
    })
})

// get single item
route.post("/get_collect_single_item", (req: Request, res: Response) => {
    const { radio_name, isSingleCheck }: { radio_name: string, isSingleCheck: boolean } = req.body
    
    useSqlite(db => {
        db.all("SELECT * FROM radio_collect_list WHERE radio_name = ?", radio_name, (err: Error, data: any | { [key: string]: any }[]) => {
            if (err) {
                res.json({ message: err.message })
            } else {
                const resItem = isSingleCheck ? {
                    message: 'search success',
                    haveTheSame: data.length > 0
                } : {
                    message: 'search success',
                    data
                }
                res.json(resItem)
            }
            db.close()
        })
    })
})

// delete single item
route.post("/delete_item", (req: Request, res: Response) => {
    const { uuid } = req.body

    useSqlite(db => {
        db.run(`DELETE FROM radio_collect_list where uuid = ?`, uuid, (err?: { [key: string]: any }) => {
            if (err === null) {
                res.json({ message: 'delete success' })
            } else {
                res.json({ message: err.code })
            }
            db.close()
        })
    })
})

// get user setting
route.get("/get_user_setting", (req: Request, res: Response) => {
    useSqlite(db => {
        db.all("SELECT * FROM user_setting", (err: Error, data: any) => {
            if (err) {
                res.json({ message: err.message })
            } else {
                res.json(data)
            }
            db.close()
        })
    })
})

// add user setting
route.post("/add_user_setting", (req: Request, res: Response) => {
    const { language }: { language: string } = req.body

    useSqlite(db => {
        db.run(`INSERT INTO user_setting (language,create_date) VALUES(?,datetime('now','localtime'))`, [language], (err?: { [key: string]: any }) => {
            if (err === null) {
                res.json({ message: 'add success' })
            } else {
                res.json({ message: err.code })
            }
        })
    })
})

// update user setting
route.post('/update_user_setting', (req: Request, res: Response<{ message: string, status: string }>) => {
    const { uuid, language, remote_language }: { uuid: string, language: string, remote_language:string } = req.body
    useSqlite(db => {
       db.run("UPDATE user_setting SET language = ?,remote_language = ?,update_date = datetime('now','localtime') WHERE uuid = ?", [language, remote_language,uuid], (err: Error) => {
          res.json({
             message: err ? err.message : 'update success',
             status: err ? 'error' : 'ok'
          })
       })
    })
 })

export default route