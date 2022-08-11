const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello world');
});

const obj = {
  'userId': 1,
  'id': 1,
  'title': 'delectus aut autem',
  'completed': false
}

app.get('/todos/1', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(obj))
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})