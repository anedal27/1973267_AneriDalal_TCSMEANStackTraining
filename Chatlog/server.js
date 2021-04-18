let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";
let port = 9090;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("Client connected to application...");
    socket.on("chat", (msg) => {
        mongoClient.connect(url, { useUnifiedTopology: true }, (errDB, client) => {
            if (!errDB) {
                let db = client.db("meanstack");
                db.collection("Chatlog").insertOne({ name: msg.name, message: msg.msg }, (errQ, result) => {
                    if (!errQ) {
                        console.log("Message sent!");
                    } else {
                        console.log("Unable to send mesage " + errQ);
                    }
                    client.close();
                });
            } else {
                console.log("Error " + errDB);
            }
        });
    });
});

http.listen(port, () => console.log(`Server running on port ${port}`));