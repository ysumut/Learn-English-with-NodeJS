const router = require('express').Router();
const user_ctrl = require('../controller/login_ctrl');



router.get('/login', (req, res) => {

    res.render('login');
})

router.post('/login', user_ctrl, (req,res)=>{
    
    res.render('userActivate', {
        navbar_name: req.session.firstname,
        f_name: req.session.firstname,
        l_name: req.session.lastname
    });
})



module.exports = router;
