import { Request, Response, Router } from "express"
import { Database } from 'sqlite3'
const { sqlite, fileUrl } = require('../db_setting')

const route: Router = Router()

// Sqlite3 demo CRD
// select all data
route.get("/get_collect_item", (req: any, res: any) => {
    const db: Database = new sqlite.Database(fileUrl)
    db.all("SELECT * FROM radio_collect_list", (err: Error, data: any) => {
        if (err) {
            res.json({ message: err.message })
        } else {
            res.json(data)
        }
        db.close()
    })

})

// add item
route.post("/add_item", (req: Request, res: Response) => {
    const db: Database = new sqlite.Database(fileUrl)
    const {
        radio_name,
        radio_img_url
    }: {
        radio_name: string,
        radio_img_url: string
    } = req.body
    db.run(`INSERT INTO radio_collect_list(radio_name,radio_img_url,create_date) VALUES(?,?,datetime('now','localtime'))`, [radio_name, radio_img_url], (err?: { [key: string]: any }) => {
        if (err === null) {
            res.json({ message: 'add success' })
        } else {
            res.json({ message: err.code })
        }
    })
})

// get single item
route.post("/get_collect_single_item", (req: Request, res: Response) => {
    const db: Database = new sqlite.Database(fileUrl)
    const { radio_name, isSingleCheck }: { radio_name: string, isSingleCheck: boolean } = req.body
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

// delete single item
route.post("/delete_item", (req: Request, res: Response) => {
    const db: Database = new sqlite.Database(fileUrl)
    const { uuid } = req.body
    db.run(`DELETE FROM radio_collect_list where uuid = ?`, uuid, (err?: { [key: string]: any }) => {
        if (err === null) {
            res.json({ message: 'delete success' })
        } else {
            res.json({ message: err.code })
        }
        db.close()
    })
})

module.exports = route