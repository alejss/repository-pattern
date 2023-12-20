const express = require('express');
const router = express.Router();

const userRepository = require('../../repositories/user');

router.get('/all', async (req, res) => {
  try {
    const users = await userRepository.all();

    res.status(200).json(users);
  } catch (error) {
    console.log('error: ', error);
    res.status(404).json({
      error: 'Error in service',
    });
  }
});

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

router.put('/', async (req, res) => {
  try {
    const userBody = req.body
    const user = await userRepository.update(userBody);

    res.status(200).json(user);
  } catch (error) {
    console.log('error: ', error);
    res.status(404).json({
      error: 'Error in service',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const userBody = req.body
    const user = await userRepository.create(userBody);
    console.log(user)

    res.status(200).json(user);
  } catch (error) {
    console.log('error: ', error);
    res.status(404).json({
      error: 'Error in service',
    });
  }
});

module.exports = router;
