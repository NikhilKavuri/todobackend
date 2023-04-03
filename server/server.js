// // const express = require('express');
// // const cors = require('cors');

// // const app = express();

// // app.use(express.json());
// // app.use(cors());


// const fs = require('fs');

// const todos = JSON.parse(fs.readFileSync('./todos.json'));
// // const data = [
// //   { id: 1, 
// //     text: "Learn React", 
// //     complete: false },
// //   {
// //     id: 2,
// //     text: "Learn Node",
// //     complete: false,
// //   },
// // ];
// /*

// the schema for a todo should be as follows:
// {
//     id: number (unique identifier for the todo item - should be auto generated),
//     text: string,
//     complete: boolean
// }

// the below API endpoint should return all the todos in the todos.json file
// Sample response:
// [
//     {
//         "id": 1,
//         "text": "Learn React",
//         "complete": false
//     },
//     {
//         "id": 2,
//         "text": "Learn Node",
//         "complete": false
//     },   
//     ]
// */
// app.get('/todos', (req, res) => {
//      res.json(todos);
// });


// // the below API endpoint should add a new todo to the todos.json file
// /*
// Sample request body:
// {
//     "text": "Learn Express"
// }
// Sample response:
// {
//     "id": 3,
//     "text": "Learn Express",
//     "complete": false
// }
// */
// app.post('/todo/new', (req, res) => {
//     const todo = {
//         id: Math.floor(Math.random() * 1000000),
//         text: req.body.text,
//         complete: false
//     };

//     todos.push(todo);
//     fs.writeFileSync('./todos.json', JSON.stringify(todos));

//     res.json(todo);
// });

// // the below API endpoint should delete a todo from the todos.json file
// /*
// Sample request:
// DELETE /todo/delete/1
// Sample response:
// {
//     "id": 1,
//     "text": "Learn React",
//     "complete": false
// }
// */
// app.delete('/todo/delete/:id', (req, res) => {
//     const todo = todos.find(todo => todo.id === parseInt(req.params.id));

//     const index = todos.indexOf(todo);

//     todos.splice(index, 1);

//     fs.writeFileSync('./todos.json', JSON.stringify(todos));

//     res.json(todo);
// });

// // the below API endpoint should toggle the complete status of a todo in the todos.json file
// /*
// Sample request:
// GET /todo/complete/1
// Sample response:
// {
//     "id": 1,
//     "text": "Learn React",
//     "complete": true
// }
// */
// app.get('/todo/complete/:id', (req, res) => {
//     const todo = todos.find(todo => todo.id === parseInt(req.params.id));

//     todo.complete = !todo.complete;

//     fs.writeFileSync('./todos.json', JSON.stringify(todos));

//     res.json(todo);
// });

// app.listen(5000, () => console.log("Server is running on port 5000"));

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(cors());

const File_Name = './todos.json'
const File_Data = JSON.parse(fs.readFileSync(File_Name));




app.get("/todos",(req,res)=>{
  res.send(File_Data);
})
app.post('/todo/new',(req,res)=>{
  const newNote = {
    id: Math.floor(Math.random()*1000),
    text: req.body.text,
    complete: false
  }
  const updated = [
    ...File_Data,
    newNote
  ] 
  fs.writeFileSync(File_Name,JSON.stringify(updated))
  res.json(newNote)
})

app.listen(5000,()=>{
  console.log('Server is running on port 5000');
})



// import http from 'http';
// import fs from 'fs';
// import {parse} from 'querystring';

// const File_Name = './todos.json';
// const list = JSON.parse(fs.readFileSync(File_Name));
// const hostname = 'localhost';
// const port = 5000;
// const server = http.createServer((req,res)=>{
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     if(req.url === '/'){
//         res.end(JSON.stringify(list));
//     } else if (req.url === '/todo/new' && req.method === 'POST') {
//       let body = '';
//       req.on('data', (chunk) => {
//         body += chunk.toString();
//       });
//       req.on('end', () => {
//         const data = parse(body);
//         const add = JSON.parse(Object.keys(data)[0]).add;
//         const id = list.length + 1;
//         const todo = {
//           id,
//           text: add,
//           complete: false,
//         };
//         const update = [
//           ...list,
//           todo,
//         ];
//         fs.writeFileSync(File_Name, JSON.stringify(update));
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify(update));
//       });
//     }
    
//   });

// server.listen(port, hostname, () => {
//     console.log(`server running at ${hostname}:${port}`);
// });
