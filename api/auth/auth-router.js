const router = require('express').Router();
const bcrypt = require('bcrypt')
const Users = require('../users/users-model')
const {checkUserNameTaken, validateInput} = require('../middleware/middleware')
const tokenBuilder = require('../middleware/tokenBuilder')


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

router.post('/login', validateInput, (req, res, next) => {
 let {username, password} = req.body;
 Users.findBy({username})
     .then(([user]) => {
         if (user && bcrypt.compareSync(password, user.password)) {
             // give something back (the token)= secret string
             //that is just as good as valid credentials// ^ token
             const token = tokenBuilder(user);
             res.status(200).json({
                 message: `welcome, ${user.username}!`,
                 token,
             });
         } else {
             next({ status: 401, message: 'Invalid Credentials' });
         }
     })
     .catch(next);

  /*
    IMPLEMENT
    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }
  */
});

module.exports = router;
