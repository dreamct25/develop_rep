const fileUrl = process.env.NODE_ENV === 'production' ? `${__dirname}/xyz.db` : `./src/server/xyz.db`
const sqlite = require('sqlite3').verbose()
const fs = require('fs')

if (!fs.existsSync(fileUrl)) {
    const sqliteDB = new sqlite.Database(fileUrl)
    sqliteDB.serialize(function () {
        sqliteDB.run(`
            CREATE TABLE IF NOT EXISTS radio_collect_list (
                uuid INTEGER PRIMARY KEY NOT NULL,
                radio_name TEXT NOT NULL,
                radio_img_url TEXT NOT NULL,
                create_date TEXT NOT NULL
            )
        `)
    })

    sqliteDB.close()
}

module.exports = { sqlite, fileUrl }
