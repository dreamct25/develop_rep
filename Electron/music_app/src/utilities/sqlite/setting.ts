import { Database as sqliteDB, open } from 'sqlite'
import sqlite3,{ Database as sqlite3DB , Statement } from 'sqlite3'
import fs from 'fs'
import path from 'path'

export const fileUrl = process.env.APP_ENV.trim() === 'pdt' ? 
    path.join(__dirname.replace(process.platform === 'win32' ? 'app.asar\\.webpack\\main' : 'app.asar/.webpack/main', ''),'xyz.db') : 
    path.join(__dirname.replace(process.platform === 'win32' ? '.webpack\\main' : '.webpack/main',''), 'src/utilities/sqlite/xyz.db')

const { Database } = sqlite3.verbose()

if (!fs.existsSync(fileUrl)) {

    const sqliteDB = new Database(fileUrl)

    sqliteDB.serialize(() => {

        sqliteDB.run(`
            CREATE TABLE IF NOT EXISTS song_collect_list (
                uuid INTEGER PRIMARY KEY NOT NULL,
                collect_name TEXT NOT NULL,
                collect_desc TEXT NOT NULL,
                collect_bg TEXT NOT NULL,
                create_date TEXT NOT NULL,
                update_date TEXT NULL
            )
        `)

        sqliteDB.run(`
            CREATE TABLE IF NOT EXISTS song_collect (
                uuid INTEGER PRIMARY KEY NOT NULL,
                song_collect_uuid INTEGER NOT NULL,
                song_id TEXT NOT NULL,
                song_art TEXT NOT NULL,
                song_name TEXT NOT NULL,
                song_thum_url TEXT NOT NULL,
                song_sort_num INTEGER NOT NULL,
                create_date TEXT NOT NULL
            )
        `)

        sqliteDB.run(`
            CREATE TABLE IF NOT EXISTS user_setting (
                uuid INTEGER PRIMARY KEY NOT NULL,
                language TEXT NULL,
                remote_language TEXT NULL,
                player_volume INTEGER NULL,
                bg_buf BLOB NULL,
                bg_blur_pec INTEGER NULL,
                bg_mask_pec INTEGER NULL,
                them_color TEXT NULL,
                update_date TEXT NULL,
                create_date TEXT NOT NULL
            )
        `)

        sqliteDB.run(`
            INSERT INTO user_setting (
                language,
                remote_language,
                player_volume,
                create_date
            ) VALUES ('en','en',0.5,datetime('now','localtime'))
        `)
    })

    sqliteDB.close()
}

const useSqlite: <T>(fn: (db: sqliteDB<sqlite3DB, Statement>) => Promise<T>) => Promise<T> = async fn => {
    
    const connect = await open({ filename: fileUrl, driver: sqlite3.Database })
    
    return await fn.call(fn, connect)
}

export default useSqlite
