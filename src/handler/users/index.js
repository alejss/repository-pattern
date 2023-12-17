const express = require('express');
const router = express.Router();

const userRepository = require('../../repositories/user');

router.get('/:id', (req, res) => {
  const userID = req.params.id;
  const user = userRepository.get(userID);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'user not found' });
  }
});

module.exports = router;
