import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'Javascript Gym',
        description: 'Javascript Gym',
        phone: '123456789',
        latitude: -23.6431282,
        longitude: -46.660879,
      })

    await request(app.server)
      .post('/gyms')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'Typescript Gym',
        description: 'Typescript Gym',
        phone: '123456789',
        latitude: -22.4541686,
        longitude: -68.9200342,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.6431282,
        longitude: -46.660879,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym',
      }),
    ])
  })
})
