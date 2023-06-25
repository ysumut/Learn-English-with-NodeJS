module.exports = (id, newWords, callback) => {

    const MongoClient = require('mongodb').MongoClient;

    const uri = "***";
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        if (err) throw err;

        const collection = client.db("English").collection("words");



        collection.updateOne({ _id: id }, { $set: { mywords: newWords } }, (err) => {
            if (err) throw err;
        
            console.log('Kelimeler güncellendi!')
        })
        

        


        client.close(err => {
            if (err) throw err;

            callback();
        })
    })

}
