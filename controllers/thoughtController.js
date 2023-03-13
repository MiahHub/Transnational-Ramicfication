const { thought, Thought } = require('../models');

module.exports = {
  getThought(req, res) {
    Thought.find({})
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  //create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return userController.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((Thought) =>
        !thought
          ? res.status(404).json({ message: 'No user found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // get one thought

  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // update a thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // dlelete a thought by id

  deleteThought(req, res) {
    Thought.findAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID' })
          : Thought.deleteMany({ _id: { $in: thought.thoughts } })
      )
      .then(() => res.json({ message: 'thought successfully deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  //add a reaction

  createReaction(req, res) {
    Thought.findAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete reaction

  deleteReaction(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete a firend
  deleteFriend(req, res) {
    thought
      .findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
