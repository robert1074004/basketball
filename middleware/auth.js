const { ensureAuthenticated, getUser } = require('../helpers/auth-helpers')

const authenticated = (req, res, next) => {
    if (ensureAuthenticated(req)) {
        return next()
    }
    res.redirect('/login')
}

const authenticatedAdmin = (req, res, next) => {
    if (ensureAuthenticated) {
        if (getUser(req).is_admin) return next()
        res.redirect('basketball/')
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    authenticated,
    authenticatedAdmin
}
