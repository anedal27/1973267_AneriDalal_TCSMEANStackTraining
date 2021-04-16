let app = require("express")();
let bodyParser = require("body-parser");
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
let port = 9090;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/addCourse", (req, res) => {
    res.sendFile(__dirname + "/addCourse.html");
});

app.post("/addCourse", (req, res) => {
    let cID = req.body.cID;
    let cName = req.body.cName;
    let desc = req.body.desc;
    let amount = req.body.amount;
    mongoClient.connect(url, { useUnifiedTopology: true }, (errDB, client) => {
        if (!errDB) {
            let db = client.db("meanstack");
            db.collection("Courses").insertOne({ _id: cID, cName: cName, desc: desc, amount: amount }, (errQ, result) => {
                if (!errQ) {
                    res.send("Course added!");
                } else {
                    res.send("Unable to add course " + errQ);
                }
                client.close();
            });
        } else {
            console.log("Error " + errDB);
        }
    });
});

app.get("/updateCourse", (req, res) => {
    res.sendFile(__dirname + "/updateCourse.html");
});

app.post("/updateCourse", (req, res) => {
    let cID = req.body.cID;
    let amount = req.body.amount;
    mongoClient.connect(url, { useUnifiedTopology: true }, (errDB, client) => {
        if (!errDB) {
            let db = client.db("meanstack");
            db.collection("Courses").updateMany({ _id: cID }, { $set: { amount: amount } }, (errQ, result) => {
                if (!errQ) {
                    if (result.modifiedCount > 0) {
                        res.send("Course amount updated!");
                    } else {
                        res.send("Course not found");
                    }
                } else {
                    res.send("Unable to update course amount " + errQ);
                }
                client.close();
            });
        } else {
            console.log("Error " + errDB);
        }
    });
});

app.get("/deleteCourse", (req, res) => {
    res.sendFile(__dirname + "/deleteCourse.html");
});

app.post("/deleteCourse", (req, res) => {
    let cID = req.body.cID;
    mongoClient.connect(url, { useUnifiedTopology: true }, (errDB, client) => {
        if (!errDB) {
            let db = client.db("meanstack");
            db.collection("Courses").deleteMany({ _id: cID }, (errQ, result) => {
                if (!errQ) {
                    if (result.deletedCount > 0) {
                        res.send("Course deleted!");
                    } else {
                        res.send("Course not found");
                    }
                } else {
                    res.send("Unable to delete course " + errQ);
                }
                client.close();
            });
        } else {
            console.log("Error " + errDB);
        }
    });
});

let tableTop = `
    <h1>Fetch Courses</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Description</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
`
let tableBottom = `
        </tbody>
    </table>
`;

app.get("/fetchCourse", async (req, res) => {
    let mdb = await mongoClient.connect(url, { useUnifiedTopology: true });
    let db = await mdb.db("meanstack");
    let collection = db.collection("Courses");
    let cursor = await collection.find();
    let courses = await cursor.toArray();
    res.write(tableTop);
    for (let i = 0; i < courses.length; i++) {
        let row = `
            <tr>
                <td>${courses[i]._id}</td>
                <td>${courses[i].cName}</td>
                <td>${courses[i].desc}</td>
                <td>${courses[i].amount}</td>
            </tr>
        `
        res.write(row);
    }
    res.write(tableBottom);
    res.end();
});

app.listen(port, () => console.log(`Server running on port ${port}`));