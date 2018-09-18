module.exports = {
  register: (req, res) => {
    let { firstName, lastName, username, email, password, avitar } = req.body;
    email = email ? email : null; // prevents 'undefined' from being passed into db in favor of 'null'... necessary?
    avitar = avitar ? avitar : null;
    db.register_new_user([firstName, lastName, username, email, password, avitar]).then(result => {
      console.log(result);
      res.status(200).send(result);
    }).catch(error => console.log('Error from authController.register', error));
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