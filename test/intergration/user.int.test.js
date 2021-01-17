const request = require('supertest');
const app = require('../../server');

const newUser = {
  "name":"hyoje",
  "job":"developer",
  "age":31
}

let firstUser; 

it('POST /api/users', async () => {
  const response = await request(app)
    .post('/api/users')
    .send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.job).toBe(newUser.job);
    expect(response.body.age).toBe(newUser.age);
})

it('should return 500 on POST /api/users', async () => {
  const response = await request(app)
    .post('/api/users')
    .send({name: "hyoje"});
    expect(response.statusCode).toBe(500);
    // console.log('response.body', response.body)
    expect(response.body).toStrictEqual({message: "user validation failed: job: Path `job` is required." })
})

//@@ desc read(GET) Intergration TDD
it('GET /api/users', async () => {
  const response = await request(app).get('/api/users');
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].job).toBeDefined();
  firstUser = response.body[0];
})

it('GET /api/users/:userId', async () => {
  const response = await request(app).get('/api/users/' + firstUser._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstUser.name);
  expect(response.body.job).toBe(firstUser.job);
})

it('GET userId does not exist /api/users/:userId', async () => {
  const response = await request(app).get('/api/users/5fff8d1cc94936d14ba2f700');
  expect(response.statusCode).toBe(404);
})