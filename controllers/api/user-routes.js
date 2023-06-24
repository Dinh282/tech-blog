const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user on the server side
router.post('/', async (req, res) => {
  try {

    const existingUser = await User.findOne({//findOne() method used on User model to find a user in db(where username = req.body.username)
      where: { username: req.body.username }
  })

  if (existingUser) { //If user is found, then username is already taken.
    return res.status(400).json({ message: 'Username is already taken. Please choose a different username.'})
  }
    //if !existingUser, process to create a new user with create() method.
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // saves user's session data
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({ //finds the username in db
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) { //if username is not found, respond with 400 cde and message.
      res
        .status(400)
        .json({ message: 'Incorrect user ID or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password); //checkPassword is a custom method
    //defined in User model use to check if pw matches user's stored pw.

    if (!validPassword) { //If pw does not match with what is stored in db, res with 400 code
      res
        .status(400)
        .json({ message: 'Incorrect user ID or password. Please try again!' });
      return;
    }

    req.session.save(() => { //If pw matches, save user's session and loggedIn state.
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {//If user is loggedIn, then delete their session.
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;