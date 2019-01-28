const express = require('express');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const { open } = require('../models/mongoose/_connection');

open();


const { createComment } = require('../models/comments');

const app = express();

app.get('/', (req, res) => res.send({ hello: 'world' }));


app.post('/comments', jsonParser, async (req, res) => {
  const comment = await createComment(req.body);
  res.send(comment);
});

module.exports = app;
