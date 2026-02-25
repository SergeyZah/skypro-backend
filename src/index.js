const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const userName = url.searchParams.get("hello");

  if (request.url === "/?users") {
    response.statusCode = 200;
    response.statusMessage = "Ok";
    response.headers = "Content-Type: application/json";
    response.write(getUsers());
    response.end();

    return;
  } else if (userName) {
    response.statusCode = 200;
    response.statusMessage = "Ok";
    response.headers = "Content-Type: text/plain";
    response.write(`Hello, ${userName}!`);
    response.end();

    return;
  } else if (request.url === "/?hello" || request.url === "/?hello=") {
    response.statusCode = 400;
    response.statusMessage = "Bad request";
    response.headers = "Content-Type: text/plain";
    response.write("Enter a name");
    response.end();

    return;
  } else if (request.url === "/") {
    response.statusCode = 200;
    response.statusMessage = "Ok";
    response.header = "Content-Type: text/plain";
    response.write("Hello, world!");
    response.end();
  } else {
    response.statusCode = 500;
    response.statusMessage = "Server error";
    response.header = "Content-Type: text/plain";
    response.write("");
    response.end();
  }
  
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу: http://127.0.0.1:3003");
});