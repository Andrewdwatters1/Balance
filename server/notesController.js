module.exports = {
    getAllNotes: (req, res) => {
      let db = req.app.get('db');
      db.notes.getNotes(req.session.user.id).then(result => {
        console.log(result);
        res.status(200).send(result);
      })
    }, 
    addNotes: (req, res) => {
      let db = req.app.get('db');
      let { id } = req.session.user // ???
      let { title, content, date } = req.body;
      db.notes.createNotes([id, title, content, date]).then(result => {
        res.status(200).send(result);
      })
    },
    deleteNotes: (req, res) => {
      let{id} = req.params
      let db = req.app.get('db');
      db.notes.deleteNotes([id, req.session.user.id]).then(result => {
        res.status(200).send(result);
      })
    },

    //SCRATCHPAD
    getScratchPad: (req, res) => {
      let db = req.app.get('db');
      db.notes.getscratchpad(req.session.user.id).then(result => {
        console.log(result);
        res.status(200).send(result);
      })
    },
    addScratchPad:(req, res) => {
      let db = req.app.get('db');
      let { id } = req.session.user // ???
      let { title, content, date } = req.body;
      db.notes.createscratchpad([id, title, content, date]).then(result => {
        res.status(200).send(result);
      })
    },
    deleteScratchPad: (req, res) => {
        let{id} = req.params
        let db = req.app.get('db');
        db.notes.deletescratchpad([id, req.session.user.id]).then(result => {
          res.status(200).send(result);
        })
      },
    editScratchPad: (req, res) => {
      let db = req.app.get('db');
      db.notes.updatescratchpad([id, req.session.user.id]).then(result =>{
        res.status(200).send(result);
      })
    }
  }