const Socket = require("./index");

const socket = new Socket("http://localhost:8080/tammuz/ws2");
socket.connect({})
    .then(() => {
        console.log("Hello world!");
        socket.disconnect();
    });