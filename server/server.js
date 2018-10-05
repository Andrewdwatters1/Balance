const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const session = require('express-session');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(process.env.BCRYPT_HASH, salt);
const cron = require('node-cron');
// const path = require('path')



const authController = require('./authController');
const habitsController = require('./habitsController');
const eventsController = require('./eventsController')
const notesController = require('./notesController');
const todoController = require('./todoController')
const weatherController = require('./weatherController')
const backgroundController = require('./backgroundController')

const app = express();
const serverPort = process.env.SERVER_PORT;

app.use(bodyParser.json());
//////////////////////////// TESTING ///////////////////////////////////
massive(process.env.TEST_CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Test Database is linked! ');
  })

app.use((req, res, next) => {
  if (req.query.test || req.body.test || req.params.test === process.env.TEST_CODE) {
    req.session = {};
    req.session.user = { id: 1 }
  }
  next()
})
//////////////////////////// TESTING ///////////////////////////////////

// massive(process.env.CONNECTION_STRING).then(db => {
//     app.set('db', db)
//     console.log('Database is linked! ');
// })
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: false,
//     resave: false
// }))


app.use(express.static(`${__dirname}/../build`));

// AUTH ENDPTS
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.get('/auth/currentUser', authController.getCurrentUser);
app.delete('/auth/logout', authController.logout);
app.delete('/auth/logoutUser', authController.logoutUser);

// HABITS ENDPTS
app.get('/api/habits', habitsController.getAllHabits);
app.post('/api/habit', habitsController.getHabitStartDate);
app.put('/api/habits', habitsController.markComplete);
app.post('/api/habits', habitsController.addHabit);
app.delete('/api/habits', habitsController.deleteHabit);
app.get('/api/habitEvents', habitsController.getAllHabitEventsByHabit);
app.post('/api/habitEvents', habitsController.addHabitEvent);
app.post('/api/addHabitToday', habitsController.addHabitToday);
app.post('/api/getTodaysHabits', habitsController.getTodaysHabits);
app.post('/api/deleteHabit', habitsController.deleteHabit);

// TODO ENDPOINTS
app.get('/api/todo/:userid', todoController.getTodos)
app.delete('/api/todo/:id/:userid', todoController.deleteTodos)
app.put('/api/todo/:id/:userid', todoController.editTodo)
app.post('/api/todo', todoController.createTodo)
app.put('/api/todo/complete/:id/:userid', todoController.markComplete)
app.put('/api/todo/incomplete/:id/:userid', todoController.markIncomplete)
app.get('/api/todo/nested/:parenttodoid', todoController.getNested)
app.post('/api/todo/nested', todoController.createNested)
app.delete('/api/todo/nested/:id/:parenttodoid', todoController.deleteNested)
app.put('/api/todo/nested/:id/:parenttodoid', todoController.updateNested)
app.put('/api/todo/nested/complete/:id/:parenttodoid', todoController.markNestedComplete)
app.put('/api/todo/nested/incomplete/:id/:parenttodoid', todoController.markNestedIncomplete)

// CALENDAR ENDPTS
app.post('/api/events', eventsController.createEvent)
app.get('/api/events', eventsController.getEventsByDate)
app.put('/api/events/:id', eventsController.updateEventById)
app.delete('/api/events/:id', eventsController.updateEventById)
app.get('/api/eventdates', eventsController.getEventsForWeek)

//  WEATHER ENDPTS
app.get('/api/weather', weatherController.getWeather)

// NOTES ENDPTS
app.get('/api/notepad', notesController.getAllNotes)
app.post('/api/notepad', notesController.addNotes)
app.delete('/api/notepad/:id', notesController.deleteNotes)
app.put('/api/notepad/:id', notesController.updateNotes)

//SCRATCHPAD ENDPTS
app.get('/api/scratchpad', notesController.getScratchPad)
app.post('/api/scratchpad', notesController.addScratchPad)
app.delete('/api/scratchpad/:id', notesController.deleteScratchPad)
app.put('/api/scratchpad/:id', notesController.updateScratchPad)

//MORE ENDPTS
app.put('/api/backgrounds/', backgroundController.updateBackground)

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

cron.schedule('1 0 0 * * *', () => { // runs at 00:01 in user's timezone daily
// cron.schedule('* * * * *', () => {
    habitsController.updateHabitEvents(app);
    habitsController.deleteTodaysHabits(app);
    notesController.autoAddScratchPad(app);
    console.log('cron script hit at ', new Date());
}, {
        scheduled: true,
    })


app.listen(serverPort, () => {
    console.log('Server is running on port: ', serverPort);
})
