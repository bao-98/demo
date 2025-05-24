import express from 'express';
import fs from 'fs';
const app = express();
const PORT = 3000;

// Read JSON file once when server starts
const students = JSON.parse(fs.readFileSync('./students.json'));

app.get('/', (req, res) => {
  res.send('✅ Server is working!');
});

app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/students/:name', (req, res) => {
  const student = students.find(s => 
    s.name.toLowerCase() === req.params.name.toLowerCase()
  );
  student ? res.json(student) : res.status(404).send('Student not found');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});