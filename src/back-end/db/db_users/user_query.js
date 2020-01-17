module.exports = (email, callback) => {
    
    let email_OK = true;

    const MongoClient = require('mongodb').MongoClient;

    const uri = "***";
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        if (err) throw err;

        const collection = client.db('English').collection('users');


        let find = collection.find({email: email})

        find.forEach(data => {
            if(data)
                email_OK = false;
        })



        client.close(err => {
            if (err) throw err;
            callback(email_OK);
        });

    });

}