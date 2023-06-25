module.exports = (word, callback) => {

    function word_s(){
        let text = word;
        let text_s = text.split(' ');

        if(text_s.length > 1){
            text = '';

            text_s.forEach(item => {
                text += item + '%20'
            })

            return text.slice(0,-3)
        }

        return text;
    }



    const request = require('request');
    const cheerio = require('cheerio');

    const data = [];

    request('translate_url' + word_s(), async function (error, response, html) {
        if (!error && response.statusCode == 200) {

            var $ = cheerio.load(html);

            await $('td').each(function (i, element) {

                data.push($(this).find('a').text());

            });

            function run() {

                const newData = []

                data.forEach(item => {
                    if (item != "")
                        newData.push(item);
                });

                return {word: word,
                        means: [newData[1], newData[3], newData[5]]
                    };
            }

            callback(run());
        }
    });


}
