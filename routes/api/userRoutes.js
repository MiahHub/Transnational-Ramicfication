const router = require('express').Router();

const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

//users:

router.route('/').get(getUser).post(createUser);

// get put delete users by userId:

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

//post and delete friend by firnedId:

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
