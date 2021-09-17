const router = require('express').Router();
const bcrypt = require('bcrypt')
const Users = require('../users/users-model')
const {checkUserNameTaken, validateInput} = require('../middleware/middleware')


router.post('/register',checkUserNameTaken, validateInput, async (req, res, next) => {
  let users = req.body
  const rounds = process.env.BCRYPT_ROUNDS || 8
  const hash = bcrypt.hashSync( users.password, rounds)
  users.password = hash
  await Users.add(users)
      .then(saved =>{
        res.status(201).json(saved)
      })
      .catch(next)
  /*
    IMPLEMENT
    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }
  */
});

router.post('/login', (req, res) => {
  res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
