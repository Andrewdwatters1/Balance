var bcrypt = require('bcryptjs');

module.exports = {
  register: (req, res) => {
    let db = req.app.get('db');
    let { firstName, lastName, username, email, password, avitar } = req.body; // or wherever
    email = email ? email : null; // prevents 'undefined' from being passed into db in favor of 'null'... necessary?
    avitar = avitar ? avitar : null;
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(password, salt, (error, hash) => {
        db.auth.register_new_user([firstName, lastName, username, email, hash, avitar]).then(result => {
          console.log(result);
          res.status(200).send(result);
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
            let {username, firstname, lastname, zipcode, email, avitar} = req.session.user;
            res.status(200).send({username, firstname, lastname, zipcode, email, avitar});
          })
        } else {
          res.status(403).send(req.session.user);
        }
      });
    });
  },


  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
}