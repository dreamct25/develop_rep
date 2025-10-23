const sql = require("mssql")
const connectObject = {
    user:"SA",
    password:"testDB123",
    server:"127.0.0.1",
    port:1490,
    database:"shopDB"
}
const models = {
    sql,
    connectObject,
    trans:(text)=>{
        let newText = ""
        text == null ? newText = null : newText = text
        return newText
    }
}

module.exports = models