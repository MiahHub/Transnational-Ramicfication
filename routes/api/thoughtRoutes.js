const router = require('express').Router();

const {
  getThought,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

//thoughs
router.route('/').get(getThought).post(createThought);

//by thought id
router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

//by reaction
router.route('/:thoughtId/reactions').post(createReaction);

//react id
router.route('/:thoughtId/reactions/reactionId').delete(deleteReaction);

module.exports = router;
