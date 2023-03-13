const router = require('express').Router();

const {
  getThought,
  getOneThought,
  getAllThoughts,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  getOneReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

//thoughs
router.route('/').get(getThought).post(createThought);

//by thought id
router
  .route('/:thoughtId')
  .get(getOneThought)
  .get(getAllThoughts)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought)
  .post(createReaction)
  .get(getOneReaction)
  .delete(deleteReaction);

//by reaction
router.route('/:thoughtId/reactions').post(createReaction);
//get reaction
router.route('/:thoughtId/reactions/:reactionId').get(getOneReaction);

router.route('/:thoughtId').get(getOneThought);
//react id
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
