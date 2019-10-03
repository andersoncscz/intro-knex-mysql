const db = require('../config/db')

db('users')
    .where({ id: 11 })
    .delete()
    .then(result => console.log(`${result} record(s) deleted!`))
    .finally(() => db.destroy())