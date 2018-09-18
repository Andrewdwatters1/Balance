const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const session = require('express-session');
// const path = require('path')

// import controllers

const app = express();
const serverPort = process.env.SERVER_PORT;

app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('Database is linked! ');
})
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}))
// app.use(express.static(`${__dirname}/../build`)) // production build only

// DEFINE ENDPTS

// app.get('*', (req, res) => { // production build only 
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

app.listen(serverPort, () => {
  console.log('Server is running on port: ', serverPort);
})
