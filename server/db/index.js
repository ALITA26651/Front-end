const mysql=require("mysql")

const connection=mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'alita26651',
    database: 'torrent'
})

module.exports=connection