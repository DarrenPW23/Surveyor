const con = require('../connect')

BaseTable = class {
    constructor(table = '', pk = '', fk = '') {
        this.table = table;
        this.pk = pk;
        this.fk = fk;
    }

    /* CREATE */
    insert(keys = [], values = []) {
        // var keys = Object.keys(args)
        // var values = Object.values(args)

        // if (keys.length < 1) return false

        var qry = `INSERT INTO ${this.table}`

        if (keys.length > 0) {
            qry += ' ('

            for (let i = 0; i < keys.length; i++) {
                qry += keys[i]

                if (i < keys.length - 1)
                    qry += ', '
            }

            qry += ') VALUES ?'
        }

        // because it's a prepared statement, the values variable must be a nested array
        // because you can add multiple values
        return con.query(qry, [values])
    }

    /* READ */
    get(args = {}, limit = null, offset = null) {
        var qry = `SELECT * FROM ${this.table}`
        var keys = Object.keys(args)
        var values = Object.values(args)

        // if (keys.length < 1) return false

        if (keys.length > 0) {
            qry += ` WHERE `

            for (let i = 0; i < keys.length; i++) {
                qry += keys[i]

                qry += typeof args[keys[i]] == 'object' ? ` IN (?) ` : ` = ? `

                if (i < keys.length - 1)
                    qry += `AND `
            }
        }

        qry += limit ? ` LIMIT ${limit}` : ''
        qry += offset ? ` OFFSET ${offset}` : ''

        return con.query(qry, values)
    }

    /* UPDATE */
    update(args = {}) {
        var qry = `UPDATE ${this.table}`
        var keys = Object.keys(args)
        var values = Object.values(args)

        // if (keys.length < 1) return false

        if (keys.length > 0) {
            qry += ` SET `

            for (let i = 0; i < keys.length; i++) {
                qry += keys[i]

                qry += ` = '${args[keys[i]]}'`

                if (i < keys.length - 1)
                    qry += ` AND `
            }

            qry += ` WHERE `

            for (let i = 0; i < keys.length; i++) {
                qry += keys[i]

                qry += typeof args[keys[i]] == 'object' ? ` IN (?) ` : ` = ? `

                if (i < keys.length - 1)
                    qry += `AND `
            }
        }

        return con.query(qry, values)
    }

    /* DELETE */
    remove(args = {}) {
        var qry = `DELETE FROM ${this.table}`
        var keys = Object.keys(args)
        var values = Object.values(args)

        // if (keys.length < 1) return false

        if (keys.length > 0) {
            qry += ` WHERE `

            for (let i = 0; i < keys.length; i++) {
                qry += keys[i]

                qry += typeof args[keys[i]] == 'object' ? ` IN (?) ` : ` = ? `

                if (i < keys.length - 1)
                    qry += `AND `
            }
        }

        return con.query(qry, values)
    }
}

module.exports = BaseTable