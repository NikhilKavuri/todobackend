const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }
  if (req.method === "GET" && req.url === "/todos") {
    const todos = JSON.parse(fs.readFileSync("./todos.json"));
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(todos));
  }
  if (req.method === "POST" && req.url === "/todo/new") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const todos = JSON.parse(fs.readFileSync("./todos.json"));
      const newNote = {
        id: todos.length + 1,
        text: JSON.parse(body).text,
        complete: false,
      };
      const updated = [...todos, newNote];
      fs.writeFileSync("./todos.json", JSON.stringify(updated));
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(newNote));
    });
  }
  if (req.method === "DELETE" && req.url.startsWith("/todo/delete/")) {
    const lastTerm = parseInt(req.url.split("/")[3]);
    console.log(lastTerm);
    const todos = JSON.parse(fs.readFileSync("./todos.json"));
    const todoIndex = todos.findIndex((todo) => todo.id === lastTerm);
    if (todoIndex >= 0) {
      const deletedTodo = todos.splice(todoIndex, 1)[0];
      fs.writeFileSync("./todos.json", JSON.stringify(todos));
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(deletedTodo));
    } else {
      res.writeHead(404);
      res.end();
    }
  }
  if (req.method === "GET" && req.url.startsWith("/todo/complete/")) {
    const lastTerm = parseInt(req.url.split("/")[3]);
    console.log(lastTerm);
    const todos = JSON.parse(fs.readFileSync("./todos.json"));
    const todo = todos.find((todo) => todo.id === lastTerm);
    if (todo) {
      todo.complete = true;
      fs.writeFileSync("./todos.json", JSON.stringify(todos));
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(todo));
    }
  }
});

server.listen(5000, () => console.log("Server is running on port 5000"));