const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 8080;

const obj = {
  'userId': 1,
  'id': 1,
  'title': 'delectus aut autem',
  'completed': false
}

const ensureToken = (req, res, next) => {
  const cookieHeader = req.headers.cookie;
  if (typeof cookieHeader !== undefined) {
    const cookie = cookieHeader.split("awth-token=");
    const cookieToken = cookie[1];
    try {
      jwt.verify(cookieToken, 'skittles', {algorithms: ['HS256']}, (err, decoded) => {
        if (decoded === undefined) {
          console.log(decoded)
          res.sendStatus(401);
        } else {
          console.log(decoded);
          req.token = cookieToken;
        }
      })
      next();
    } catch (err) {
      console.log(err);
      res.sendStatus(401);
    }
  }
}

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/todos/1', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(obj))
})

app.get('/protected', ensureToken, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify('This is protected'))
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})