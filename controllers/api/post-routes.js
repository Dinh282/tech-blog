const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


//Api endpoint to create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Api endpoint to delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//API Endpoint for updating a post. Route pattern /:id means that the route expects an id parameter in URL path.
//withAuth middle is for authenticating the request
router.put('/:id', withAuth, async (req, res) =>{
  try {
    //.update is a sequelize method used to update records in the database
    const updatedPost = await Post.update(req.body, {
      //We want to update a post with matching id and user_id. id we get from the URL parameter and user_id from the session.
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

  //This checks to see if any rows were affected by the update. If the condition is falsy then it means no rows
  //were updated.
  if (!updatedPost[0]) {
    res.status(404).json({message: 'No post found with this id!'});
    return;
  }
    //If the update was successful we res with a successful 200 status code. 
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;