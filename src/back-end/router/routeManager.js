const router = require('express').Router();
const regis_router = require('./regis_router');
const login_router = require('./login_router');
const edit_router = require('./edit_router');


const redirectIndex = (req, res, next) => {
    if (req.session.firstname) {
        res.render('index', { navbar_name: req.session.firstname });
    } else {
        next();
    }
}

const redirectUser = (req, res, next) => {
    
    if (req.session.firstname) {
        res.render('userActivate', {
            navbar_name: req.session.firstname,
            f_name: req.session.firstname,
            l_name: req.session.lastname
        });
    }
    else {
        next();
    }

};


router.get('/', redirectIndex, (req, res) => {
    res.render('index');
})

router.use('/edit', edit_router);


router.get('/user', redirectUser, (req, res) => {
    res.render('user');
})

router.post('/user', (req, res) => {
    res.redirect('/user');
    req.session.destroy();
});

router.use('/user', redirectUser, regis_router, login_router);


module.exports = router;
