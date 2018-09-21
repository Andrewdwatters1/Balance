var bcrypt = require('bcryptjs');

module.exports = {
  register: (req, res) => {
    let db = req.app.get('db');
    let { firstName, lastName, username, email, password, avitar, zip } = req.body;
    avitar = avitar ? avitar : null;
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(password, salt, (error, hash) => {
        db.auth.register_new_user([firstName, lastName, username, email, hash, avitar, zip]).then(result => {
          let { id, firstname, lastname, username, email, zipcode, avitar } = result[0];
          let currentUser = { id, firstname, lastname, username, email, zipcode, avitar }
          res.status(200).send(currentUser);
        }).catch((error) => console.log('Error from authController.register => register_new_user.sql', error));
      });
    });
  },
  login: (req, res) => {
    let db = req.app.get('db');
    let { username, password } = req.body; // needs to come from elsewhere
    db.auth.get_user_by_login_info([username, password]).then(result => {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response === true) {
          db.auth.get_user_by_id(result[0].id).then(result => {
            req.session.user = result[0];
            let { username, firstname, lastname, zipcode, email, avitar } = req.session.user;
            res.status(200).send({ username, firstname, lastname, zipcode, email, avitar });
          })
        } else {
          res.status(403).send({data: null});
        }
      });
    });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getCurrentUser: (req, res) => {
    if(req.session.user) {
      let { id, firstname, lastname, username, email, avitar, zip } = req.session.user;
      id ? id : null;
      firstname ? firstname : null;
      lastname ? lastname : null;
      username ? username : null;
      email ? email : null;
      avitar ? avitar : null;
      zip ? zip : null;
      var currentUser = { id, firstname, lastname, username, email, avitar, zip };
    }
    res.status(200).send(currentUser)
  }
}