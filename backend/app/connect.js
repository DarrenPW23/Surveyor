const mysql = require('mysql')
const util = require('util')

var config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'surveyor',
    multipleStatements: true
}

// var con = mysql.createConnection(config)

// con.connect((err) => {
//     if (err) throw new Error(err)
// })

makeDb = () => {
    const con = mysql.createConnection(config)

    return {
        query(sql, args) {
            return util.promisify(con.query)
                .call(con, sql, args)
        },
        close() {
            return util.promisify(con.end).call(con)
        }
    }
}

module.exports = makeDb()
// module.exports = con