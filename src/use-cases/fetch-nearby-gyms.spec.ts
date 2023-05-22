import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'Gym 01 description',
      phone: '123456789',
      latitude: -23.6431282,
      longitude: -46.660879,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'Gym 02 description',
      phone: '123456789',
      latitude: -22.4541686,
      longitude: -68.9200342,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.6431282,
      userLongitude: -46.660879,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
