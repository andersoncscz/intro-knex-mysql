const db = require('../config/db')

async function saveUser(name, email, password) {
    try {
        
        let user = await db.select().from('users').where({ email }).first()

        if (!user) {
            const [ id ] = await db.insert({ 
                name, 
                email, 
                password, 
                is_active: true, 
                created_at: new Date() 
            }).into('users')

            user = { id, ...newUser }
        } else {
            await db('users').where({ id: user.id }).update({ name, email, password })
            user = await db.select().from('users').where({ id: user.id }).first()
        }
        
        return user

    } catch (error) {
        throw error
    }
}

async function saveProfile(name, label) {
    try {
        
        let profile = await db.select().from('profiles').where({ name }).first()

        if (!profile) {
            const [ id ] = await db.insert({ name, label }).into('profiles')
            profile = { id, ...newProfile }

        } else {
            await db('profiles').where({ id: profile.id }).update({ name, label })
            profile = await db.select().from('profiles').where({ id: profile.id }).first()
        }
        
        return profile

    } catch (error) {
        throw error
    }
}

async function addProfilesForUsers(user, ...profiles) {
    try {
        
        await db('users_profiles').where({ user_id: user.id }).delete()

        for (const profile of profiles) {
            await db.insert({ 
                user_id: user.id,
                profile_id: profile.id
            })
            .into('users_profiles')
        }        
    } catch (error) {
        throw error
    }
}

async function run() {
    try {
        
        const user = await saveUser('Exercise1', 'exercise@knex.com.br', '123456')
        
        const profileA = await saveProfile('profileA', 'Profile A')
        const profileB = await saveProfile('profileB', 'Profile B')
        const profileC = await saveProfile('profileC', 'Profile C')

        await addProfilesForUsers(
            user, 
            profileA, profileB, profileC
        )
        
        console.log('User:', user)
        console.log('Profiles:', profileA, profileB, profileC)
        console.log('Done!')

        db.destroy()

    } catch (error) {
        console.log(error, error.sqlMessage)
        db.destroy()
    }
}

run()