const userController = require('../../controllers/userController');
const userModel = require('../../models/user');
const httpMocks = require('node-mocks-http')
const allUsers = require('../all-users.json');

//@@ desc make a mock function
userModel.create = jest.fn(); 
userModel.find = jest.fn();
userModel.findById = jest.fn();
userModel.findByIdAndUpdate = jest.fn();
userModel.findByIdAndDelete = jest.fn();

// @@ desc make a mock data
const newUser = {
  "name":"hyoje",
  "job":"developer",
  "age":31
}
const userId = "5fff8d1cc94936d14ba2f726";
const updatedUser = {name: "updated", job: "updated"};
let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
})

//@@ desc create user TDD
describe('User Controller Create', () => {
  beforeEach(() => {
    req.body = newUser;
  })
  it('should have a create user function', () => {
    expect(typeof userController.createUser).toBe('function');
  });
  it('should call userModel.create', async () => {
    await userController.createUser(req, res, next);
    expect(userModel.create).toBeCalledWith(newUser);
  });
  it('should return 201 response code', async () => {
    await userController.createUser(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  })
  it('should return json body', async () => {
    userModel.create.mockReturnValue(newUser);
    await userController.createUser(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newUser);
  })

  it('should handle errors', async () => {
    const errorMessage = {message: "job property is missing"};
    const rejectedPromise = Promise.reject(errorMessage);
    userModel.create.mockReturnValue(rejectedPromise);
    await userController.createUser(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  })
})

//@@ desc read(GET) user TDD

describe("User Controller Read(GET)", () => {
  it('should have a read(GET) users function', () => {
    expect(typeof userController.getUsers).toBe('function');
  })
  it('should call a userModel.find()', async () => {
    await userController.getUsers(req, res, next);
    expect(userModel.find).toHaveBeenCalledWith({});
  })
  it('should return 200 response', async () => {
    await userController.getUsers(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  })
  it('should return json body', async () => {
    userModel.find.mockReturnValue(allUsers);
    await userController.getUsers(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allUsers);
  })
  it('should handle error', async () => {
    const errorMessage = {message: "Error finding user data"}
    const rejectedPromise = Promise.reject(errorMessage);
    userModel.find.mockReturnValue(rejectedPromise);
    await userController.getUsers(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  })
})

describe('User Controller GetById', () => {
  it('should have a getUserById', () => {
    expect(typeof userController.getUserById).toBe('function');
  });
  
  it('should call userModel findById', async () => {
    req.params.userId = userId;
    await userController.getUserById(req, res, next);
    expect(userModel.findById).toBeCalledWith(userId);
  })

  it('should return json body and response code 200', async () => {
    userModel.findById.mockReturnValue(newUser);
    await userController.getUserById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newUser);
    expect(res._isEndCalled()).toBeTruthy;
  })
  it('should return response code 404 when userId does not exist', async () => {
    userModel.findById.mockReturnValue(null);
    await userController.getUserById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy;
  })
  it('should handle errors', async () => {
    const errorMessage = {message: "Error"};
    const rejectedPromise = Promise.reject(errorMessage);
    userModel.findById.mockReturnValue(rejectedPromise);
    await userController.getUserById(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  })
})

describe('User Controller Update', () => {
  it('should have an updateUser function', () => {
    expect(typeof userController.updateUser).toBe('function');
  })
  it('should call userModel.findByIdAndUpdate', async () => {
    req.params.userId = userId;
    req.body = updatedUser;
    await userController.updateUser(req, res, next);
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(      
      userId, updatedUser, {new: true}
    )
  })
  it('should return json body and statusCode 200 response', async () => {
    req.params.userId = userId;
    req.body = updatedUser;
    userModel.findByIdAndUpdate.mockReturnValue(updatedUser);
    await userController.updateUser(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedUser);
    expect(res._isEndCalled).toBeTruthy();
  })
  it('should handle 404 when user does not exist', async () => {
    userModel.findByIdAndUpdate.mockReturnValue(null);
    await userController.updateUser(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled).toBeTruthy();
  })
  it('should handle errors', async () => {
    const errorMessage = {message: "Error"};
    const rejectedPromise = Promise.reject(errorMessage);
    userModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await userController.updateUser(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  })
})

describe('User Controller Delete', () => {
  it('should have a deleteUser function',() => {
    expect(typeof userController.deleteUser).toBe('function');
  })
  it('should call userModel findByIdAndDelete', async () => {
    req.params.userId = userId;
    await userController.deleteUser(req, res, next);
    expect(userModel.findByIdAndDelete).toBeCalledWith(userId);
  })
  it('should return 200 response', async () => {
    //@@ desc mock value for deleting
    let deletedUser = {
      name : "deleted User",
      job : "deleted Job"
    }
    userModel.findByIdAndDelete.mockReturnValue(deletedUser);
    await userController.deleteUser(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(deletedUser);
  })
  it('should handle 404 when user does not exist', async () => {
    userModel.findByIdAndDelete.mockReturnValue(null);
    await userController.deleteUser(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  })
  it('should handle errors', async () => {
    const errorMessage = {message: "Deleting Error"};
    const rejectedPromise = Promise.reject(errorMessage);
    userModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await userController.deleteUser(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  })
})