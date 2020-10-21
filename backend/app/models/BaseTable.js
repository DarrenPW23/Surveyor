const con = require('../connect')
const unique = require("array-unique").immutable

BaseTable = class {
    constructor(table = '', pk = '', fk = '') {
        this.table = table;
        this.pk = pk;
        this.fk = fk;
    }

    /* CREATE */
    insert(entries = []) {
        var qry = `INSERT INTO ${this.table}`

        var keys = []
        var values = []

        entries.forEach(entry => {
            keys = keys.concat(Object.keys(entry))
        })
        keys = unique(keys)

        entries.forEach((entry, i) => {
            keys.forEach(key => {
                if(!entry.hasOwnProperty(key)) entry[key] = ''
            })

            entries[i] = entry
        })

        entries.forEach(entry => {
            
        });

        entries.forEach(entry => values.push(Object.values(entry)));

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
        return con.query(qry, values)
    }

    /* READ */
    get(args = {}, limit = null, offset = null) {
        var qry = `SELECT * FROM ${this.table}`

        var keys = Object.keys(args)
        var values = Object.values(args)

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
    update(set = {}, where = {}) {
        var qry = `UPDATE ${this.table}`

        var setkeys = Object.keys(set)
        var wherekeys = Object.keys(where)

        if (setkeys.length > 0) {
            qry += ` SET `

            for (let i = 0; i < setkeys.length; i++) {
                qry += setkeys[i]

                qry += ` = ?`

                if (i < keys.length - 1)
                    qry += `, `
            }

            qry += ` WHERE `

            for (let i = 0; i < wherekeys.length; i++) {
                qry += wherekeys[i]
                var val = where[wherekeys[i]]

                if(typeof val == 'object') {
                    val = val.join(',')
                }

                qry += typeof where[wherekeys[i]] == 'object' ? ` IN (${val}) ` : ` = ${val} `

                if (i < wherekeys.length - 1)
                    qry += `AND `
            }
        }

        return con.query(qry, Object.values(set))
    }

    /* DELETE */
    remove(args = {}) {
        // var qry = `DELETE FROM ${this.table}`
        // var keys = Object.keys(args)
        // var values = Object.values(args)

        // if (keys.length > 0) {
        //     qry += ` WHERE `

        //     for (let i = 0; i < keys.length; i++) {
        //         qry += keys[i]

        //         qry += typeof args[keys[i]] == 'object' ? ` IN (?) ` : ` = ? `

        //         if (i < keys.length - 1)
        //             qry += `AND `
        //     }
        // }

        // return con.query(qry, values)
    }
}

module.exports = BaseTable