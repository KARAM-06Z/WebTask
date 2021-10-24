const http = require("http");
const debug  = require("debug")("node-angular");
const app = require("./app_backend/app");

const PORT = process.env.PORT || 3000;

app.set("port" , PORT);
const server = http.createServer(app);

server.listen(PORT);
