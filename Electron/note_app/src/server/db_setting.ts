import sqlite3, { Database as DatabaseType } from "sqlite3"

const fileUrl = process.env.NODE_ENV === 'production' ? `${__dirname}/xyz.db` : `./src/server/xyz.db`
const { Database } = sqlite3.verbose()
const fs = require('fs')

if (!fs.existsSync(fileUrl)) {
    const sqliteDB = new Database(fileUrl)
    sqliteDB.serialize(function () {
        sqliteDB.run(`
            CREATE TABLE IF NOT EXISTS note_list (
                uuid INTEGER PRIMARY KEY NOT NULL,
                note_desc TEXT NOT NULL,
                create_date TEXT NOT NULL,
                update_date TEXT
            )
        `)
        sqliteDB.run(`
            CREATE TABLE IF NOT EXISTS user_setting (
                uuid INTEGER PRIMARY KEY NOT NULL,
                font_size TEXT NOT NULL,
                font_color TEXT NOT NULL,
                font_style TEXT NOT NULL,
                font_family TEXT NOT NULL,
                font_line_height TEXT NOT NULL,
                background_color TEXT NOT NULL,
                create_date TEXT NOT NULL,
                update_date TEXT
            )
        `)
    })

    sqliteDB.close()
}

const makeSqliteMethod: (fn: (db: DatabaseType) => void) => void = fn => {
    const db: DatabaseType = new Database(fileUrl)
    fn.call(fn, db)
}



export default makeSqliteMethod
