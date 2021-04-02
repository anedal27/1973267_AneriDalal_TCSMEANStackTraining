let fs = require("fs");

let logger = (jsonArr, fileName) => {
    jsonString = JSON.stringify(jsonArr);
    fs.writeFileSync(fileName, jsonString);
}

module.exports = {logger};