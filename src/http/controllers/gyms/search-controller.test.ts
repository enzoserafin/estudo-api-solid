import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gym controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should to be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'PUBG gym',
        description: 'A local to learn how to fire',
        phone: '99999999',
        latitude: -25.4334069,
        longitude: -49.256466,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Dota gym',
        description: 'A local to learn how to dive',
        phone: '99999999',
        latitude: -25.4334069,
        longitude: -49.256466,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'PUBG',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'PUBG gym',
      }),
    ])
  })
})
