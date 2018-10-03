const googleTrends = require('google-trends-api');

module.exports = {
  getAllHabits: (req, res) => { // completed
    let db = req.app.get('db');
    let { id } = req.session.user;
    db.habits.get_habits_by_user(id).then(result => {
      res.status(200).send(result);
    }).catch(error => console.log('Error from habitsController.getAllHabits', error));
  },
  markComplete: (req, res) => {
    let db = req.app.get('db');
    db.mark_complete(id).then(result => {
      console.log(result);
      res.status(200).send(result);
    }).catch(error => console.log('Error from habitsController.markComplete', error));
  },
  addHabit: (req, res) => { // completed
    let db = req.app.get('db');
    let { userId, title, description, dateFormatted, date, type } = req.body;
    db.habits.add_habit([userId, title, description, dateFormatted, date, type]).then(() => {
      db.habits.get_habits_by_user(userId).then(result => {
        res.status(200).send(result);
      })
    }).catch(error => console.log('Error from habitsController.addHabit', error));
  },
  deleteHabit: (req, res) => {
    let db = req.app.get('db');
    db.habits.delete_habit(id).then(result => {
      res.status(200).send(result);
    }).catch(error => console.log('Error from habitsController.deleteHabit', error));
  },
  getHabitStartDate: (req, res) => {
    let db = req.app.get('db');
    let { habitId } = req.body;
    db.habits.get_habit_start_date(habitId).then(result => {
      res.status(200).send(result);
    }).catch(error => console.log('Error from habitsController.getHabitStartDate', error));
  },
  addHabitEvent: (req, res) => {
    let db = req.app.get('db');
    let { habitId, daysFromStart } = req.body;
    db.habits.add_habit_event([habitId, daysFromStart]).then(result => {
      res.status(200).send(result);
    }).catch(error => console.log('Error from habitsController.addHabitEvent', error));
  },
  getAllHabitEventsByHabit: (req, res) => {
    let db = req.app.get('db');
    db.habits.get_all_habitEvents_by_habit(req.query.id).then(result => {
      res.status(200).send(result);
    }).catch(error => console.log('Error from habitsController.getallHabitEventsByUser', error));
  },
  updateHabitEvents: (app) => {
    let db = app.get('db');
    db.habits.update_habit_events().then(result => {
    }).catch(error => console.log('Error from habitsController.updateHabitEvents CRON EVENT', error))
  },
  addHabitToday: (req, res) => {
    let db = req.app.get('db');
    let { habitId, id } = req.body;
    db.habits.habit_completed_today(habitId, id).then(() => {
      db.habits.get_todays_habits(req.session.user.id).then(result => {
        res.status(200).send(result);
      })
    }).catch(error => console.log('Error from habitsController.habitCompletedToday', error));
  },
  getTodaysHabits: (req, res) => {
    let db = req.app.get('db');
    let { id } = req.body;
    db.habits.get_todays_habits(id).then(result => {
      res.status(200).send(result);
    }).catch(error => console.log('Error from habitsController.getTodaysHabits', error));
  },
  deleteTodaysHabits: (app) => {
    let db = app.get('db');
    db.habits.delete_todays_habits().then(result => {
    }).catch(error => console.log('Error from habitsController.deleteTodaysHabits, CRON EVENT', error))
  },
  deleteHabit: (req, res) => {
    let db = req.app.get('db');
    let { id } = req.body;
    db.habits.delete_habit(id).then(result => {
      res.status(200).send(result);
    }).catch(error => console.log('Error from habitsController.deleteHabits', error));
  }
}