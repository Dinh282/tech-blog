
const router = require('express').Router();
const { Blog } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    // const dbBlogData = await Blog.findAll({
    //   include: [
    //     {
    //       model: Blog,
    //       attributes: ['title', 'content'],
    //     },
    //   ],
    // });

    // const blogs = dbBlogData.map((blog) =>
    //   blog.get({ plain: true })
    // );

    res.render('homepage', {
      // blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;