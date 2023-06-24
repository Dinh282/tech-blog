
const router = require('express').Router();
const { Post, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({ //findAll() method to get all posts from db of Post model.
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['createdAt', 'DESC']], // This order options added to findALL method is to specify the order of the post
      // base on their createdAt in descending order. We do this because we want the latest posts to appear first on the list at the homepage 
      //screen
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true }) //data serialization. 
    );
    const isHomePage = true; // Set the isHomePage variable to true for the main.handlebars template.

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      isHomePage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET dashboard page
router.get('/dashboard', async (req, res) => {
  try {
    // Check if the user is logged in
    if (req.session.loggedIn) {
      // Fetch the user's posts from the database 
      const dbPostData = await Post.findAll({
        where: { user_id: req.session.user_id },
        include: [{ model: User, attributes: ['username'] }],
      });

      // Map the posts data to plain objects
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      // Render the dashboard template with the posts data
      res.render('dashboard', { loggedIn: true, posts });
    } else {
      // If user is not logged in, redirect them to the login page
      res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET Render the edit form
router.get('/dashboard/edit/:id', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.render('login');
      return;
    }

    const postId = req.params.id;
    const postData = await Post.findByPk(postId);
    //Here we serialize the data of postData to get only what we need use sequelize command {plain:true}. 
    //This will filter out Sequelized-specific metadata and methods.
    const post = postData.get({plain: true});

    if (!post) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    
    //Pass on post data found by Id (data is used to inject into edit.handlebars template)
    res.render('edit', { loggedIn: true, post });
    
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET route to render the new post form
router.get('/dashboard/new', withAuth, (req, res) => {//withAuth is a middleware or helper function
  //that ensures that only authenticated user can access the route. withAuth is defined in auth.js.
  res.render('post', {loggedIn: true});
});


// GET route to render signup page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup'); // Render the signup page template
});

// Get route to see if user is logged in, if not show them the login page.
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});


module.exports = router;