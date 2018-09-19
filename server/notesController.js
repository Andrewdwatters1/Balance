module.exports = {
    getAllNotes: (req, res) => {
      let db = req.app.get('db');
      db.notes.getNotes().then(result => {
        console.log(result);
        res.status(200).send(result);
      })
    }, 
    addNotes: (req, res) => {
      let db = req.app.get('db');
      let { userId } = req.session.user // ???
      let { title, content, date } = req.body;
      db.notes.createNotes([userId, title, content, date]).then(result => {
        res.status(200).send(result);
      })
    },
    deleteNotes: (req, res) => {
      let db = req.app.get('db');
      db.notes.deleteNotes(id).then(result => {
        res.status(200).send(result);
      })
    }
  }