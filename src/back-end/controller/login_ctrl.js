function login(req, res, next) {

    let email = req.body.email,
        pw = req.body.pw;


    require('../db/db_users/login_db')(email, pw, (result) => {

        if (result) {
            if (result.approved) {
                
                req.session._id = result._id;
                req.session.firstname = result.firstname;
                req.session.lastname = result.lastname;
                
                next();
            }
            else {
                res.render('login',
                    { error: 'Sayın ' + result.firstname + ", hesabınızı aktive etmediğiniz için giriş yapamıyorsunuz. " +
                        "Lütfen '" + result.email + "' hesabındaki mailinizi kontrol ediniz. (Gereksiz klasörüne de bakın!)"});
            }       
        }
        else {
            res.render('login', { error: "Email veya şifre hatalı!" });
        }

    });


}

module.exports = login;
