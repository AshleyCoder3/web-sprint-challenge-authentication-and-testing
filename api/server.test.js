const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async()=>{
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async ()=>{
  await db.destroy()
})

test('sanity', () => {
  expect(true).not.toBe(false)
})

describe('[POST] /register', ()=>{
   test('responds with new user', async ()=>{
     const res = await request(server)
         .post('/api/auth/register')
         .send({username: "foo", password: "bar"})
       expect(res.body).toMatchObject({id:1, username:'foo'})
   })
   test('responds with 422 "username and password are required" when no password is provided',
       async ()=>{
           const res = await request(server)
               .post('/api/auth/register')
               .send({username: 'doctor'})
           expect(res.status).toBe(422)
       })
})
describe('[POST] /login', ()=>{
   test('respond with 200 when user login', async ()=>{
       const res = await request(server)
           .post('/api/auth/register')
           .send({username: "foo", password: "bar"})
       expect(res.status).toBe(201)
       const user = await request(server)
           .post('/api/auth/login')
           .send({username: "foo", password: "bar"})
       expect(user.status).toBe(200)
   })
   test('respond with 401 if wrong credentials',async ()=>{
       const res = await request(server)
           .post('/api/auth/login')
           .send({username: "bob", password: "2222"})
       expect(res.status).toBe(401)
   })
})
