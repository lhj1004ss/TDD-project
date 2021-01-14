const userController = require('../../controllers/userController');
const userModel = require('../../models/user');
const httpMocks = require('node-mocks-http')

//@@ desc make a mock function
userModel.create = jest.fn(); 

// @@ desc make a mock data
const newUser = {
  "name":"hyoje",
  "job":"developer",
  "age":31
}

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
})

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