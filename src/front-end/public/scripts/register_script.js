class Register {

    name() {
        var c = true;
        var firstname = document.getElementById('firstname');
        var lastname = document.getElementById('lastname');

        if (firstname.value.length == 0) {
            firstname.style.borderColor = "red";
            c = false;
        } else {
            firstname.style.borderColor = "lightgrey";
        }

        if (lastname.value.length == 0) {
            lastname.style.borderColor = "red";
            c = false;
        } else {
            lastname.style.borderColor = "lightgrey";
        }

        return [c, firstname.value, lastname.value];
    }

    email() {
        var c = true;
        var email = document.getElementById('signup_email');
        var email_text = email.value;

        if (email_text.split('@').length - 1 != 1 || email_text.indexOf('@') == 0 || email_text.slice(-4, -1) + email_text.slice(-1) != '.com') {

            email.style.borderColor = "red";
            c = false;

        }
        else{
            email.style.borderColor = "lightgrey";
        }

        return [c,email_text];
    }

    password() {
        var c = true;
        var pw1 = document.getElementById('signup_password1');
        var pw2 = document.getElementById('signup_password2');

        var pw1_text = pw1.value;
        var pw2_text = pw2.value;

        if (pw1_text.length < 6 || pw1_text.length > 18 || pw1_text != pw2_text) {

            pw1.style.borderColor = "red";
            pw2.style.borderColor = "red";
            c = false;

        }
        else{
            pw1.style.borderColor = "lightgrey";
            pw2.style.borderColor = "lightgrey";
        }

        return [c, pw1_text, pw2_text];
    }

}

document.getElementById('registerButton').onclick = () => {
    var reg = new Register();

    var name = reg.name();
    var email = reg.email();
    var pw = reg.password();
    
    if(name[0] && email[0] && pw[0]){
        // başarılı kayıt
    }
}