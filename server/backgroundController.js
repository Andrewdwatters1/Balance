const backgrounds = require('../src/components/Settings/Backgrounds')

module.exports = {
    
    updateBackground: async (req, res) => {
        try {
          let db = req.app.get('db');
          let user_id = req.session.user.id;
          let {background_id} = req.body;
          let background = backgrounds[background_id]
          let response= await db.background.updateBackground([user_id, background])
        res.send(response[0])
        } catch (error) {
          console.log('Event Update Error', error)
          res.status(500).send(error)
        }
      }

}