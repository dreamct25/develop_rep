const sql = require("mssql")
const sqlConnectSetting = {
    user:"SA",
    password:"ownDB1556",
    server:"192.168.99.100",
    database:"test",
    port:1490,
    options: {trustServerCertificate: true}
}

module.exports = {
    sql,
    sqlConnectSetting
}