const express = require('express');
const app = express();
const path = require('path');
const { syncNseed, models } = require('./db');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/items', (req, res, next)=>{
  models.Item.findAll()
  .then( result => res.send(result))
  .catch(next);
});

const port = process.env.PORT || 9000;

app.listen(port, ()=> console.log(`Listening on port ${port} !!!`));

syncNseed();
