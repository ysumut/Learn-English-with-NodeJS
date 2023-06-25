const router = require('express').Router();
const { redirectEdit } = require('../controller/edit_ctrl');
const { queryData } = require('../controller/edit_ctrl');
const { insert } = require('../controller/edit_ctrl');
const { update } = require('../controller/edit_ctrl');
const { sleep } = require('../controller/edit_ctrl');

let load = 0;
let allWords = "empty";


router.get('/', redirectEdit, (req, res) => {
    allWords = "empty";

    res.render('edit', {
        navbar_name: req.session.firstname
    });

    queryData(req, (data) => {
        if(data)
            allWords = data;
        else
            allWords = "";
    });
})

router.post('/', redirectEdit, async (req, res) => {
    await res.redirect('/edit');

    const inputWords = require('../controller/edit_ctrl').getArea(req);

    load = 0;
    let c = 0;
    let limit = 1;
    let t_words = [];


    for (let i = 0; i < inputWords.length; i++) {
        
        if(limit % 7 == 0)
            await sleep(3000);

        limit++;
        
        await require('../controller/translate_ctrl')(inputWords[i], async (jsonWord) => {

            if (jsonWord.means[0])
                t_words.push(jsonWord);

            c++;

            load += (100 / inputWords.length);
            console.log(load.toFixed(2) + '%');


            if (c == inputWords.length) {

                queryData(req, (data) => {

                    if (!data)
                        insert(req, res, t_words, (n, w) => {
                            load = n;
                            allWords = w;
                        });
                    
                    else
                        update(req, res, data, t_words, (n, w) => {
                            load = n;
                            allWords = w;
                        });

                });
            }

        })
    }
    

})


router.get('/load.json', redirectEdit, (req, res) => {

    res.json({ load: load.toFixed(2) });
})


router.get('/words.html', redirectEdit, (req, res) => {
    let words = [];

    if (allWords == "empty") {
        words.push({})
    }
    else if(allWords == "") {
        words.push("<a href='#' class='list-group-item list-group-item-action list-group-item-info'> No words! </a>")
    }
    else if(allWords[0]) {
        allWords.forEach(item => {
            words.push("<ul class='list-group list-group-horizontal'>" +
                "<a href='#' class='list-group-item list-group-item-action list-group-item-info'>" +
                item.word + "<a href='#' class='list-group-item list-group-item-action list-group-item-info'>" +
                item.means + "</a> </ul>")
        })
    }
    

    res.send(words);


})




module.exports = router;

