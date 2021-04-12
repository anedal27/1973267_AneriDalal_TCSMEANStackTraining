let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let port = 9090;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("Client connected to application...");
    socket.on("chat", (msg) => {
        console.log(msg);
    });
});

http.listen(port, () => console.log(`Server running on port ${port}`));