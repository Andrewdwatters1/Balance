const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const session = require('express-session');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/r*d-lsx?}", salt);
// const path = require('path')  // PRODUCTION BUILD ONLY

const authController = require('./authController');
const habitsController = require('./habitsController');
const notesController = require('./notesController');
const todoController = require('./todoController')

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
// app.use(express.static(`${__dirname}/../build`)) /// PRODUCTION BUILD ONLY

// AUTH ENDPTS
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.get('/auth/currentUser', authController.getCurrentUser);
app.delete('/auth/logout', authController.logout);

// HABITS ENDPTS
app.get('/api/habits', habitsController.getAllHabits);
app.put('/api/habits', habitsController.markComplete);
app.post('/api/habits', habitsController.addHabit);
app.delete('/api/habits', habitsController.deleteHabit);

// TODO ENDPOINTS
app.get('/api/todo', todoController.getTodos)
app.delete('/api/todo/:id', todoController.deleteTodos)
app.put('/api/todo/:id', todoController.editTodo)
app.post('/api/todo', todoController.createTodo)
// TODO ENDPTS

// CALENDAR ENDPTS

// NOTES ENDPTS
// app.get('/api/notepad', notesController.getNotes)
app.post('/api/notepad', notesController.addNotes)
app.delete('/api/notepad/:id', notesController.deleteNotes)

// app.get('*', (req, res) => { // PRODUCTION BUILD ONLY
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

app.listen(serverPort, () => {
  console.log('Server is running on port: ', serverPort);
})
