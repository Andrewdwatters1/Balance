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
      
      updateScratchPad: async (req, res) => {
        try {
          let db = req.app.get('db');
          let id = req.params.id;
          let user_id = req.session.user.id;
          let {title, date, content} = req.body;
          let responseInfo = await db.notes.updatescratchpad([id, user_id, title, date, content])
          res.send(responseInfo[0])
        } catch (error) {
          console.log('Scratch Pad Update Error', error)
          res.status(500).send(error)
        }
      },
    }
  // updateScratchPad: (req, res) => {
  //   let {id} = req.params
  //   let {title, date, content} = req.body
  //   let db = req.app.get('db');
  //   db.notes.updatescratchpad([id, req.session.user.id, title, date, content]).then(result =>{
  //     res.status(200).send(result);
  //   })
  // }


  // let {id} = req.params
  // let {name, price}= req.body
  // let index = pies.findIndex(s => s.id === +id)
  // if(index !== -1) {
  //     pies[index].name = name
  //     pies[index].price=price
  // }
  // res.status(200).send(pies)