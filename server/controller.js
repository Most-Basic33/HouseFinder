module.exports = {
    getHomes: async (req, res) => {
        const db = req.app.get('db'),
            homes = await db.get_homes()

        return res.status(200).send(homes)
    },
    getUsers: async (req, res) => {
        const db = req.app.get('db'),
            users = await db.get_user()
console.log(users)
        return res.status(200).send(users)
    },
    
    findUser: async (req, res) => {
        const db = req.app.get('db'),
            { name } = req.params;

        const found = await db.get_user_name(name)

        return res.status(200).send(found)

    },
    findHome: async (req, res) => {
        const db = req.app.get('db'),
            { name } = req.params;

        const found = await db.get_home_name(name)

        return res.status(200).send(found)


    },
    addHome: async (req, res) => {
        const db = req.app.get('db'),
            { name, address, city, state, zip, photo } = req.body;

        const finished = await db.add_home(name, address, city, state, zip, photo)
        res.status(200).send(finished)

    },
    updateProfile: async (req, res) => {

        const db = req.app.get('db'),
            { id } = req.params,
            { age, income, married, employed, email } = req.body;
        //console.log(married)
        const finished = await db.update_profile([id, age, income, married, employed, email])
        res.status(200).send(finished)
    },
    updatePrice: async (req, res) => {
        const db = req.app.get('db'),
            { id } = req.params,
            {price} = req.body
        console.log(id)
        console.log(price)
            const updated = await db.update_price([id, price])
            console.log(updated)
            res.status(200).send(updated)
    },

    deleteHome: async (req, res) => {
        const db = req.app.get('db'),
            { id } = req.params;
        let results = await db.delete_home(id)
        res.status(200).send(results)
    },
    deleteUser: async (req, res) => {
        const db = req.app.get('db'),
            { id } = req.params

        let deleted = await db.delete_user(id)
        res.status(200).send(deleted)
    }

}