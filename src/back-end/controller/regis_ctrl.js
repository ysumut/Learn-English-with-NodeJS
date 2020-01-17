const nodemailer = require('nodemailer');

class Register {

    name(req) {
        var c1 = true,
            c2 = true,
            fn = req.body.firstname,
            ln = req.body.lastname;

        if (fn.length == 0) {
            c1 = false;
        }
        if (ln.length == 0) {
            c2 = false;
        }

        return [c1, c2, fn, ln];
    }

    email(req) {
        var c = true,
            email = req.body.myemail;

        if (email.split('@').length - 1 != 1 || email.indexOf('@') == 0) {

            c = false;
        }

        return [c, email];
    }

    password(req) {
        var c1 = true,
            c2 = true,
            pw1 = req.body.pw1,
            pw2 = req.body.pw2;


        if (pw1.length < 6 || pw1.length > 18) {
            c1 = false;
        }
        if (pw1 != pw2) {
            c2 = false;
        }

        return [c1, c2, pw1, pw2];
    }

}


function main_reg(req, res) {

    var regis = new Register(),

        name = regis.name(req),
        email = regis.email(req),
        pw = regis.password(req),

        wrongList = ['', '', '', '', ''];


    if (!name[0]) {
        wrongList[0] = 'İsim girilmedi.';
    }
    if (!name[1]) {
        wrongList[1] = 'Soyisim girilmedi.';
    }
    if (!email[0]) {
        wrongList[2] = 'Email yanlış girildi.';
    }
    if (!pw[0]) {
        wrongList[3] = 'Parola 6 ile 18 karakter arasında değil.';
    }
    if (!pw[1]) {
        wrongList[4] = 'Parolalar eşleşmiyor.';
    }


    var register_ok = true;
    wrongList.find((x) => {
        if (x != "")
            register_ok = false;
    })


    if (register_ok) {
        return email[1];
    }
    else {
        res.render('register', {
            fn: wrongList[0],
            ln: wrongList[1],
            email: wrongList[2],
            pw1: wrongList[3],
            pw2: wrongList[4],

            first_value: name[2],
            last_value: name[3],
            email_value: email[1] })
    }

}

function exist_control(req, res, email_OK, callback){
    
    if(email_OK == true){

        sendMail(req, (url)=>{
            res.send("Sayın " + req.body.firstname + ",<br>" +
                req.body.myemail + " adresindeki aktivasyon mailini onayladıktan sonra giriş yapabilirsiniz.");
            
            const user_info = {firstname: req.body.firstname, 
                lastname: req.body.lastname, 
                email: req.body.myemail, 
                password: req.body.pw1,
                authority: 'member', 
                approved: false,
                url: url};
            
            callback(user_info);
            
        });
    }

    else if(email_OK == false){
        res.send(req.body.myemail + " ile kullanılmış hesap zaten mevcut!");
    }
    else{
        res.send('HATA!');
    }

}

function createURL(req){

    function random(min, max){
        let x = Math.floor(Math.random() *100);
        while(x<min || x>=max){
            x = Math.floor(Math.random() *100);
        }
        return x;
    }

    let url = "";
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    for(let i=0; i<30; i++){
        let number1 = random(0, chars.length);
        let number2 = random(0, 10);
        url += chars[number1];
        url += number2;
    }

    return url + req.body.myemail; 
    // url'lerin birden fazla hesapta aynı çıkma ihtimali olduğu için, en sonda email ile birleştiriyoruz.

}

function sendMail(req, callback){

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'learnenglish.umut@gmail.com',
          pass: '***'
        }
    });

    let url = createURL(req);

    let bilgiler = {
        from: 'Umut Bulak <learnenglish.umut@gmail.com>',
        to: req.body.myemail,
        subject: 'Learn English Hesap Aktivasyonu',
        text: 'Sayın ' + req.body.firstname + ', hesabınızı aktive edin.\n' + "http://localhost:8000/user/" + url
    };

    transporter.sendMail(bilgiler, (err,info) => {

        if (err) throw error;
        
        callback(url);
        console.log('Eposta gönderildi ' + info.response);
      
    });

}



module.exports.main_reg = main_reg;
module.exports.exist_control = exist_control;