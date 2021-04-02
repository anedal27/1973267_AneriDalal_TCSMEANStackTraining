let fs = require("fs");
let rl = require("readline-sync");
let lg = require("./logging");

// Check if there are records in JSON file and add them to the array
let people = new Array();
let data = fs.readFileSync("people.json").toString();
if (data != "") {
    people = JSON.parse(data);
}
debugger;

// Ask user how many new records you want to store
let records = rl.questionInt("How many records do you want to store? ");

// Take first name, last name, gender, email and add to array
for (let i = 0; i < records; i++) {
    console.log(`Record ${i + 1}`)
    let fname = rl.question(`(${i + 1}) Enter first name: `);
    let lname = rl.question(`(${i + 1}) Enter last name: `);
    let gender = rl.question(`(${i + 1}) Enter gender: `);
    let email = rl.questionEMail(`(${i + 1}) Enter email: `);
    let date = new Date();
    people.push({ "fname": fname, "lname": lname, "gender": gender, "email": email, "date":date.toLocaleString() });
}

// Store people in JSON file
lg.logger(people, "people.json");