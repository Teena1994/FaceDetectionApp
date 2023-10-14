class UserModel {
  constructor(username, password, firstname, lastname) {
    this.password = password;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

module.exports = UserModel;
