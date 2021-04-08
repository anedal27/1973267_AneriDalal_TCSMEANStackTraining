let http = require("http");
let url = require("url");
let port = 8080;

let server = http.createServer((req, res) =>{
    res.end();
});

server.listen(port, () => console.log(`Server running on port ${port}`));