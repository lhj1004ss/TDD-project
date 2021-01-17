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

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await userModel.find({});
    res.status(200).json(allUsers);
  } catch (error) {
     next(error);
  }
}

const getUserById = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if(user){
      res.status(200).json(user);
    }else{
      res.status(404).send();
    }    
  } catch (error) {
    next(error)
  } 

}

module.exports = { 
                    createUser,
                    getUsers,
                    getUserById
                 }