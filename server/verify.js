module.exports = {
    user: (req, res, next) => {
        console.log(req.session)
        if (!req.session) {
            return res.status(403).send('You must be logged in to do that');
        }
        next()
    },
    isadmin: (req, res, next) => {
        if (!req.session.user) {
            return res.status(403).send('You must be boss level or higher')
        }
        next();
    }

}