module.exports = (email, pw, callback) => {
    let result;

    const MongoClient = require('mongodb').MongoClient;

    const uri = "***";
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        if (err) throw err;

        const collection = client.db('English').collection('users');

        collection.findOne({email: email, password: pw}, (err, data)=>{
            
            if(err) throw err;
            result = data;
        });




        client.close(err => {
            if (err) throw err;

            callback(result);
        });

    });

}

