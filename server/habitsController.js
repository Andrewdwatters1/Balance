module.exports = {
  getAllHabits: (req, res) => {
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
  addHabit: (req, res) => {
    let db = req.app.get('db');
    console.log(req.body);
    let { userId, title, description, startdate } = req.body;
    db.habits.add_habit([userId, title, description, startdate]).then(() => {
      db.habits.get_habits_by_user(userId).then(result => {
        res.status(200).send(result);
      })
    }).catch(error => console.log('Error from habitsController.addHabit', error));
  },
  deleteHabit: (req, res) => {
    let db = req.app.get('db');
    db.delete_habit(id).then(result => {
      res.status(200).send(result);
    }).catch(error => console.log('Error from habitsController.deleteHabit', error));
  }
}