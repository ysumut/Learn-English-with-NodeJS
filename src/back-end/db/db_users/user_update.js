module.exports = (email, callback) => {

    const MongoClient = require('mongodb').MongoClient;

    const uri = "***";
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        if (err) throw err;

        const collection = client.db('English').collection('users');

        collection.updateOne({ email: email }, {$set: {approved: true}}, (err) => {

            if (err) throw err;
            console.log('Aktivasyon Yapıldı.')
        });




        client.close(err => {
            if (err) throw err;

            callback();
        });

    });

}

