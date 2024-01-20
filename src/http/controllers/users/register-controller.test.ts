import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Register controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should to be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Fake User',
      email: 'fake@email.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
