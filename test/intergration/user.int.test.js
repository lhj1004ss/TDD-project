const request = require('supertest');
const app = require('../../server');

const newUser = {
  "name":"hyoje",
  "job":"developer",
  "age":31
}

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
    console.log('response.body', response.body)
    expect(response.body).toStrictEqual({message: "user validation failed: job: Path `job` is required." })
})