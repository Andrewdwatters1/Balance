module.exports = {
    getAllNotes: (req, res) => {
      let db = req.app.get('db');
      db.get_all_Notes().then(result => {
        console.log(result);
        res.status(200).send(result);
      })
    }, 
    addNotes: (req, res) => {
      let db = req.app.get('db');
      let { userId } = req.session.user // ???
      let { title, description } = req.body;
      db.add_notes([userId, title, description, startdate]).then(result => {
        res.status(200).send(result);
      })
    },
    deleteNotes: (req, res) => {
      let db = req.app.get('db');
      db.delete_notes(id).then(result => {
        res.status(200).send(result);
      })
    }
  }