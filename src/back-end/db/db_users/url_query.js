module.exports = (callback) => {
    
    let urls = [],
        fullnames = [],
        emails = [];

    const MongoClient = require('mongodb').MongoClient;

    const uri = "***";
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        if (err) throw err;

        const collection = client.db('English').collection('users');


        let find = collection.find({})

        find.forEach(data => {
            urls.push(data.url);
            fullnames.push(data.firstname + " " + data.lastname);
            emails.push(data.email);
        })



        client.close(err => {
            if (err) throw err;
            callback(urls, fullnames, emails);
        });

    });

}