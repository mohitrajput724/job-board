const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

let todos = [
  { id: 1, task: 'Learn Node.js' }
];

app.get('/', (req, res) => {
  res.send('Todo API is running');
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json(todo);
});

app.post('/todos', (req, res) => {
  const { task } = req.body;

  if (!task || !task.trim()) {
    return res.status(400).json({ message: 'Task is required' });
  }

  const newTodo = {
    id: Date.now(),
    task: task.trim()
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { task } = req.body;

  if (!task || !task.trim()) {
    return res.status(400).json({ message: 'Task is required' });
  }

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todo.task = task.trim();

  res.json({
    message: 'Updated successfully',
    todo
  });
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const deletedTodo = todos.splice(index, 1);

  res.json({
    message: 'Deleted successfully',
    todo: deletedTodo[0]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});