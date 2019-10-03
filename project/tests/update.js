const db = require('../config/db')

const newUser = {
    name: "Teste8",
    email: "teste8@hotmail.com",
    password: "123456",
    is_active: true,
    created_at: new Date()
}

async function update () {

    try {
        //Insert
        const result = await db.insert(newUser).into('users')
        const id = result[0]
        console.log(id)
        //Update
        await db('users').where({ id }).update({ name: 'Test8 Update' })
        
        //Select
        db.select(['id','name', 'email'])
            .from('users')
            .where({ id })
            .limit(1)
            .first()
            .then(result => {
                console.log("\n\nWHERE and FIRST:")
                console.log(result)
            })
            .finally(() => db.destroy())
    } catch (error) {
        console.log('Error: ', error.sqlMessage)
        db.destroy()
    }  
}

update()