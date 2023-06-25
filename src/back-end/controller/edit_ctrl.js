const getArea = (req) => {

    let area = req.body.area;
    let words = area.split('\r')

    let new_words = [];
    let new_word;

    for (let i = 0; i < words.length; i++) {
        if (i == 0) {
            new_words.push(words[i]);
            continue;
        }

        new_word = words[i].slice(1, -1) + words[i][words[i].length - 1];
        new_words.push(new_word);

    }

    return new_words;
}


const redirectEdit = (req, res, next) => {
    if (req.session.firstname) {
        next();
    }
    else {
        res.render('user', { info: 'You must have logged in to access this page!' })
    }
}

const queryData = (req, callback) => {

    require('../db/db_words/get_words')(req.session._id, (data) => {
        callback(data);
    })
}


const new_wordList = (result, inputWords) => {

    if (result) {
        let result_words = []
        let new_userWords = []

        result.forEach(item => {
            result_words.push(item.word);
        })

        for (let i = 0; i < inputWords.length; i++) {

            if (result_words.includes(inputWords[i].word)) // true ise gir
                delete inputWords[i]
        }

        inputWords.forEach(item => {
            if (item)
                new_userWords.push(item);
        })

        result.forEach(item => {
            new_userWords.push(item);
        })

        return new_userWords;
    }

}


const insert = (req, res, t_words, callback) => {

    require('../db/db_words/insert_words')({
        _id: req.session._id,
        mywords: t_words

    }, ()=>{
        
        queryData(req, (data)=>{
            callback(0, data);
        })
    });

}

const update = (req, res, data, t_words, callback) => {
    
    require('../db/db_words/update_words')(req.session._id, new_wordList(data, t_words), 
    ()=>{

        queryData(req, (data)=>{
            callback(0, data);
        })
    });

}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}




module.exports = {getArea, redirectEdit, queryData, new_wordList, insert, update, sleep};