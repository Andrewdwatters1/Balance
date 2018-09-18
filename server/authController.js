var bcrypt = require('bcryptjs');

module.exports = {
  register: (req, res) => {
    let { firstName, lastName, username, email, password, avitar } = req.body;
    email = email ? email : null; // prevents 'undefined' from being passed into db in favor of 'null'... necessary?
    avitar = avitar ? avitar : null;
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash('string-!@#$-cheese', salt, (error, hash) => {
        db.register_new_user([firstName, lastName, username, email, password, avitar]).then(result => {
          console.log(result);
          res.status(200).send(result);
        }).catch(error => console.log('Error from authController.register.register_new_user.sql', error));
      }).catch(error => console.log('Error from authController.register.hash', error));
    }).catch((error) => console.log('Error from authController.register.genSalt', error));
  },
  login: (req, res) => {
    let { username, password } = req.body;
    db.login([username, password]).then(result => {
      console.log(result);
      res.status(200).send(result);
    }).catch(error => console.log('Error from authController.login', error));
  },
  logout: (req, res) => {
    db.logout(id).then(result => {
      console.log(result);
      res.status(200).send(result);
    }).catch(error => console.log('Error from authController.logout', error));
  }
}