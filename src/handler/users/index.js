const express = require('express');
const router = express.Router();

const userRepository = require('../../repositories/user');

router.get('/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await userRepository.find(userID);

    res.status(200).json(user);
  } catch (error) {
    console.log('error: ', error);
    res.status(404).json({
      error: 'Error in service',
    });
  }
});

module.exports = router;
