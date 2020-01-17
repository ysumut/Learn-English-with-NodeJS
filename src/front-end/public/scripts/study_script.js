class English{

    main(){
        this.englishWords = ['banana','apple','table','home','car'];
        this.turkishWords = ['muz','elma','masa','ev','araba'];

        this.q_number = 0;
    }

    
    random(min, max){
        var x = -1;
        while(x<min || x>=max){
            var x = Math.floor(Math.random() * 10);
        }

        return x;
    }


    ask(){
        var length = this.englishWords.length;

        for(var i=0; i < length; i++){
            var rndm = this.random(0, length);

            var r_Eng = this.englishWords[rndm];
            var r_Tur = this.turkishWords[rndm];

            this.englishWords[rndm] = this.englishWords[i];
            this.turkishWords[rndm] = this.turkishWords[i];   

            this.englishWords[i] = r_Eng;
            this.turkishWords[i] = r_Tur;
        }

        document.getElementById('word').textContent = this.englishWords[this.q_number];
    };


    check(){
        document.getElementById('my_button').onclick = ()=>{
            var text = document.getElementById('my_text').value;
            
            if(text == this.turkishWords[this.q_number]){
                document.getElementById('control').innerHTML = 'CORRECT!';
            }else{
                document.getElementById('control').innerHTML = 'WRONG! <br> Answer: ' + this.turkishWords[this.q_number];
            }
        }
    }

}


document.body.onload = ()=>{
    var eng = new English();

    eng.main();
    eng.ask();
    eng.check();
}