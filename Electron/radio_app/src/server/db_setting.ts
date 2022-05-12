import sqlite3,{ Database as DatabaseType } from 'sqlite3'
import fs from 'fs'
const fileUrl = process.env.NODE_ENV === 'production' ? `${__dirname}/xyz.db` : `./src/server/xyz.db`
const { Database } = sqlite3.verbose()

if (!fs.existsSync(fileUrl)) {
    const sqliteDB = new Database(fileUrl)
    sqliteDB.serialize(function () {
        sqliteDB.run(`
            CREATE TABLE IF NOT EXISTS radio_collect_list (
                uuid INTEGER PRIMARY KEY NOT NULL,
                radio_name TEXT NOT NULL,
                radio_img_url TEXT NOT NULL,
                create_date TEXT NOT NULL
            )
        `)

        sqliteDB.run(`
            CREATE TABLE IF NOT EXISTS user_setting (
                uuid INTEGER PRIMARY KEY NOT NULL,
                language TEXT NULL,
                remote_language TEXT NULL,
                update_date TEXT NULL,
                create_date TEXT NOT NULL
            )
        `)
    })

    sqliteDB.close()
}

const useSqlite: (fn: (db: DatabaseType) => void) => void = fn => {
    const db: DatabaseType = new Database(fileUrl)
    fn.call(fn, db)
}

export default useSqlite
