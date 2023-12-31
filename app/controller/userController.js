const UserModel = require('./../model/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const users = [{
  username: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  firstname: 'Admin',
  lastname: ''
}];

//User sign up
const userSignUp = async (req, res) => {
  try {
    const { username, password, firstname, lastname } = req.body;

    //Check whether user already there in the memory. If not create a new user
    const newUser = await createUser(username, password, firstname, lastname);

    if (newUser) {
      res.status(200).json({ 'success': true, message: 'New user created successfully' });
    } else {
      // If the user is already there in memory
      res.status(400).json({ 'success': false, message: 'Username already exists. please Log in to proceed!' });
    }
  } catch (e) {
    res.status(400).json({ 'success': false, message: e.message });
  }
}

const createUser = (username, password, firstname, lastname) => {
  try {
    // Check for duplicate usernames
    if (users.some((user) => user.username === username)) {
      return null;
    } else {
      const user = new UserModel(username, password, firstname, lastname);
      users.push(user);
      return user;
    }
  } catch (e) {
    throw e;
  }
};

//User login
const userLogIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    //Check whether the username and password is there in memory
    const user = await signInUser(username, password);

    if (!user) {
      return res.status(400).json({ 'success': false, message: 'Sign-in failed, user email or password not found! please login to continue.' });
    } else {
      const token = await generateJWTToken(user);
      res.status(200).json({ 'success': true, message: 'Sign-in successful', 'user': user, 'token': token });

    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

//Search in memory for users
const signInUser = async (username, password) => {
  const user = users.find((u) => (u.username === username && u.password === password));
  return user;
}

//Generate JWT token for login user
const generateJWTToken = async (user) => {
  try {
    const token = jwt.sign({ firstname: user.firstname, lastname: user.lastname, password: user.password, username: user.username },
      process.env.JWT_SECRET, { expiresIn: '30m' });
    return token;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  userSignUp,
  userLogIn
};