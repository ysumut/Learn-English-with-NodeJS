module.exports = (id, callback) => {

    let data;

    const MongoClient = require('mongodb').MongoClient;

    const uri = "***";
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        if (err) throw err;

        const collection = client.db("English").collection("words");

        collection.findOne({_id: id}, (err, result)=>{
            data = result;
            
        });
        



        client.close(err => {
            if (err) throw err;
            
            if(data)
                callback(data.mywords);
            
            else
                callback(undefined);

        })

    })
}