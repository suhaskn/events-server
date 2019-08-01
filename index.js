const express = require('express')
const db = require('./db')
const Event = require('./event/model');


const bodyParser = require('body-parser')
const router = require('./event/router')
const cors = require('cors')

const app = express()
const port = 4000

const corsMiddleware = cors()
app.use(corsMiddleware)

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

app.use(router)

app.get('/', (req, res, next) =>
  Event.findAll()
    .then(data => res.send(data))
    .catch(next)
);

app.listen(port, ()=> console.log(`Listening on posrt:${port}`))