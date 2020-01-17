module.exports = (user_info, callback) => {

    const MongoClient = require('mongodb').MongoClient;

    const uri = "***";
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        if (err) throw err;

        const collection = client.db('English').collection('users');

        if (user_info) {
            collection.insertOne(user_info, (err) => {
                if (err) throw err;

                console.log('Üye Kaydı Yapıldı');
            });
        }




        client.close(err => {
            if (err) throw err;
            callback();
        });

    });

}

