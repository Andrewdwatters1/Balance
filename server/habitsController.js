module.exports = {
  getAllHabits: (req, res) => {
    let db = req.app.get('db');
    db.get_all_habits().then(result => {
      console.log(result);
      res.status(200).send(result);
    })
  }, 
  markComplete: (req, res) => {
    let db = req.app.get('db');
    db.mark_complete(id).then(result => {
      console.log(result);
      res.status(200).send(result);
    })
  },
  addHabit: (req, res) => {
    let db = req.app.get('db');
    let { userId } = req.session.user // ???
    let { title, description } = req.body;
    db.add_habit([userId, title, description, startdate]).then(result => {
      res.status(200).send(result);
    })
  },
  deleteHabit: (req, res) => {
    let db = req.app.get('db');
    db.delete_habit(id).then(result => {
      res.status(200).send(result);
    })
  }
}