// Read from JSON and store in array
let fs = require("fs");
let records = JSON.parse(fs.readFileSync("call_data.json").toString());

// Set up database
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";

mongoClient.connect(url, { useUnifiedTopology: true }, (errDB, client) => {
    if (!errDB) {
        let db = client.db("meanstack");
        db.collection("CallRecord").insertMany(records, (errQ, result) => {
            if (!errQ) {
                console.log(result.insertedCount);
            } else {
                console.log("Error " + errQ);
            }
            client.close();
        });
    } else {
        console.log("Error " + errDB);
    }
});