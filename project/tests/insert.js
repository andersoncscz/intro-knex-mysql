const db = require('../config/db')

const newProfile = {
    name: 'guest',
    label: 'Guest'
}

const newUser = {
    name: "Anderson",
    email: "andersoncscz@hotmail.com",
    password: "teste",
    is_active: true,
    created_at: new Date()
}

const newUserProfile = {
    user_id: 1,
    profile_id: 4
}

//Insert a new profile - ok
db('profiles')
    .insert(newProfile)
    .then(result => console.log('Inserted a new profile, with id: ', result[0]))
    .catch(error => console.log(error.sqlMessage))


//Insert a new user - ok
db('users')
    .insert(newUser)
    .then(result => console.log('Inserted a new user, with id: ', result[0]))
    .catch(error => console.log(error.sqlMessage))    


//Insert a new users_profiles - ok
db('users_profiles')
    .insert(newUserProfile)
    .then(result => console.log('Inserted a new users_profiles'))
    .catch(error => console.log(error.sqlMessage))    
