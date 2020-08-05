const bcrypt = require('bcrypt')

module.exports = {
    register: async(req, res, next)=>{
        
        const db = req.app.get('db')

        const { name, email, password  } = req.body;
    
                const foundUser = await db.check_user({email});
                if(foundUser[0]){
                    return res.status(400).send('Email already registered')
                }

                let salt = bcrypt.genSaltSync(10),
                hash = bcrypt.hashSync(password, salt)
                
//console.log(req.session )
                const newUser = await db.register(name, email, hash)
//console.log(newUser[0])
                req.session.user = newUser[0]
           //     console.log(newUser)
                res.status(201).send(req.session.user)
        
    },
    login: async(req, res) => {
        const {email, password} = req.body,
        db = req.app.get('db');

        const foundUser = await db.check_user({email})

        if(!foundUser[0]){
            return res.status(400).send('Username not found')
        }

        const authenticated = bcrypt.compareSync(password, foundUser[0].password)
        if(!authenticated){
            return res.status(403).send( 'Username/Password incorrect')
        }
        delete foundUser[0].password
        req.session.user = foundUser[0]
       // console.log(req.session,"auth controller")
        res.status(202).send(req.session.user )
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    logmein: async(req, res) =>{
        const db = req.app.get('db')
        if(req.session.user){
        
          //  console.log(req.session.user.id,"Log Me IN")
            const me = await db.get_user_id(req.session.user.id)
            res.status(200).send(me[0])
        }else{
            res.status(500).send('No User Logged In')
        }
    }
    

}