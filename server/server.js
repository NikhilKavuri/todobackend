const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await fs.readFile('./todos.json');
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(todos);
  } catch(err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
  
server.listen(5000, () => console.log("Server is running on port 5000"));