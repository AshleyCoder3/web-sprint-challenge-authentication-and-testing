const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async()=>{
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async ()=>{
  await db.seed.run()
})
afterAll(async ()=>{
  await db.seed.run()
})
afterAll(async ()=>{
  await db.destroy()
})

test('sanity', () => {
  expect(true).not.toBe(false)
})

describe('[POST] /register', ()=>{
  // test('', async ()=>{})
  // test('', async ()=>{})
})
describe('[POST] /login', ()=>{
  // test('', async ()=>{})
  // test('', async ()=>{})
})
describe('[GET] /', ()=>{
  // test('', async ()=>{})
  // test('', async ()=>{})
})