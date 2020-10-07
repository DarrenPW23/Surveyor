const con = require('../connect')

BaseTable = class {
    constructor(table = '', pk = '', fk = '') {
        this.table = table;
        this.pk = pk;
        this.fk = fk;
    }

    get(args = {}, limit = null, offset = null) {
        var qry = `SELECT * FROM ${this.table}`
        var keys = Object.keys(args)

        // qry += Object.keys(args).length ? ` WHERE ` : ''
        if(keys.length > 0) {
            qry += ` WHERE `

            for (let i = 0; i < keys.length; i++) {
                qry += keys[i]
                if(typeof args[keys[i]] == 'object')
                    qry += ` IN (?) `
                else
                    qry += ` = ? `

                if(i < keys.length-1)
                    qry += `AND `
            }
        }

        qry += limit ? ` LIMIT ${limit}` : ''
        qry += offset ? ` OFFSET ${offset}` : ''

        return con.query(qry, Object.values(args))
    }
}

module.exports = BaseTable