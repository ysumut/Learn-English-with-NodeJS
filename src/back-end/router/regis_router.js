const router = require('express').Router();
const user_ctrl = require('../controller/regis_ctrl');



router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', (req, res) => {
    
    const email = user_ctrl.main_reg(req, res);


    if (email) {

        require('../db/db_users/user_query')(email, (email_OK) => {

            console.log(email_OK);


            user_ctrl.exist_control(req, res, email_OK, (user_info) => {

                require('../db/db_users/register_db')(user_info, ()=>{
                    re_urls();
                });
            });
        });

    }

});


function re_urls() {

    require('../db/db_users/url_query')((urls, fullnames, emails) => {

        for (let i = 0; i < urls.length; i++) {

            router.get('/' + urls[i], (req, res) => {

                require('../db/db_users/user_update')(emails[i], () => {

                    res.render('approve', {
                        result: 'Sayın ' + fullnames[i] + ", hesabınız onaylanmıştır. Giriş yapabilirsiniz."
                    });

                });

            });

        };
    });

}

re_urls();


module.exports = router;
