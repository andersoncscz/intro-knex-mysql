const db = require('../config/db')

//Selects all datafields from table "profiles."
db('profiles')
    .then(result => result.map(p => ({ 
        id: p.id,
        label: p.label
    })))
    .then(data => console.log(data))


//Selects only the datafields we want from table "profiles"
db.select(['id','name', 'label'])
    .from('profiles')
    .then(result => {
        console.log("\n\n")
        console.log(result)
    })

//Only two results
db.select(['id','name', 'label'])
    .from('profiles')
    .limit(4)
    .then(result => {
        console.log("\n\nLIMIT:")
        console.log(result)
    })


//Only two results
db.select(['id','name', 'label'])
    .from('profiles')
    .limit(4)
    .offset(2) //Starts from the second data record return
    .then(result => {
        console.log("\n\nLIMIT and OFFSET:")
        console.log(result)
    })    


//Where
db.select(['id','name', 'label'])
    .from('profiles')
    .where({ id: 1 })
    .first()
    .then(result => {
        console.log("\n\nWHERE and FIRST:")
        console.log(result)
    })  
    
//Two or more wheres clauses
db.select(['id','name', 'label'])
    .from('profiles')
    .where('name', 'like', '%ad%') //Where clause with like
    .then(result => {
        console.log("\n\nWHERE with LIKE:")
        console.log(result)
    })   

    
//Two or more wheres clauses
db.select(['id','name', 'label'])
    .from('profiles')
    .whereNot('name', 'like', '%ad%') //Where not clause
    .then(result => {
        console.log(" \n\nWHERE NOT:")
        console.log(result)
    })    
    
    
//Two or more wheres clauses
db.select(['id','name', 'label'])
    .from('profiles')
    .whereIn('id', [1, 2, 3]) //Where clause with in
    .then(result => {
        console.log(" \n\nWHERE IN:")
        console.log(result)
    })
    .finally(() => db.destroy())