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
    next(error);
  } 
}

const updateUser = async (req, res, next) => {
    try {
       let updatedUser = await userModel.findByIdAndUpdate(
          req.params.userId,
          req.body,
          {new: true}
       )
        if(updatedUser){
          res.status(200).json(updatedUser); 
        }else{
          res.status(404).send();
        }   
    } catch (error) {
      next(error);
    }
}
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.userId);
    if(deletedUser){
      res.status(200).json(deletedUser);
    }else{
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
}
module.exports = { 
                    createUser,
                    getUsers,
                    getUserById,
                    updateUser,
                    deleteUser
                 }