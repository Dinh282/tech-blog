const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Api endpoint to create a comment
router.post('/:post_id', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({ //create method saves the new comment to db.
        content: req.body.comment,
        user_id: req.session.user_id,
        post_id: req.params.post_id
      });
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;