const userModel = require('../models/user');

const createUser = async (req, res, next) => {
  try {
    const newUser =  await userModel.create(req.body);
    // console.log('newUser', newUser)
    res.status(201).json(newUser);    
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser }