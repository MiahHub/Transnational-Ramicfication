const { User, Thought } = require('../models');

module.exports = {
  getUser(req, res) {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.josn(user))
      .catch((err) => res.status(500).json(err));
  },

  // get one user

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // update a user by ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // dlelete a user by id

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User found with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User successfully deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  //add a friend

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //delete a firend
  deleteFriend(req, res) {
    User.findAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
