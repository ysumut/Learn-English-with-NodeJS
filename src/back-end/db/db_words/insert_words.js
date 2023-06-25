module.exports = (userWords, callback) => {

    const MongoClient = require('mongodb').MongoClient;

    const uri = "***";
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect((err) => {
        if (err) throw err;

        const collection = client.db("English").collection("words");



        collection.insertOne(userWords, (err)=>{
            if(err) throw err;

            console.log('Kelimeler veri tabanına eklendi..')
        });
        

        


        client.close(err => {
            if (err) throw err;

            callback();
        })
    })

}