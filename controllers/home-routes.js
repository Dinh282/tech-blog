
const router = require('express').Router();
const { Post, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
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
      // User is not logged in, redirect them to the login page
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

    console.log(post)
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



// GET Render the new post form
router.get('/dashboard/new', (req, res) => {
  if (req.session.loggedIn){
  res.render('post', {loggedIn: true});
  return;
  }
  res.render('login')
});



// GET signup page
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