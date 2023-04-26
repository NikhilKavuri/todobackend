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

app.post('/todo/new', async (req, res) => {
  try {
    const todos = await fs.readFile('./todos.json');
    const newNote = {
      id: todos.length + 1,
      text: req.body.text,
      complete: false,
    };
    const updated = [...todos, newNote];
    await fs.writeFile('./todos.json', JSON.stringify(updated));
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(newNote);
  } catch(err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.delete('/todo/delete/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todos = await fs.readFile('./todos.json');
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex >= 0) {
      const deletedTodo = todos.splice(todoIndex, 1)[0];
      await fs.writeFile('./todos.json', JSON.stringify(todos));
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(deletedTodo);
    } else {
      res.status(404).send('Todo not found');
    }
  } catch(err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

  
server.listen(5000, () => console.log("Server is running on port 5000"));