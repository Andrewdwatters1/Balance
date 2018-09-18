const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const session = require('express-session');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/r*d-lsx?}", salt);
// const path = require('path')

// require controllers
const authController = require('./authController');
const habitsController = require('./habitsController');

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
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.delete('/auth/logout', authController.logout);

app.get('/api/habits', habitsController.getAllHabits);
app.put('/api/habits', habitsController.markComplete);
app.post('/api/habits', habitsController.addHabit);
app.delete('/api/habits', habitsController.deleteHabit);


// app.get('*', (req, res) => { // production build only 
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

app.listen(serverPort, () => {
  console.log('Server is running on port: ', serverPort);
})
