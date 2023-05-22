import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Gym 01',
      description: 'Gym 01 description',
      phone: '123456789',
      latitude: -23.6431282,
      longitude: -46.660879,
    })

    await gymsRepository.create({
      title: 'Gym 02',
      description: 'Gym 02 description',
      phone: '123456789',
      latitude: -23.6431282,
      longitude: -46.660879,
    })

    const { gyms } = await sut.execute({
      query: 'Gym 01',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Gym 01',
      }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym ${i}`,
        description: 'Gym 01 description',
        phone: '123456789',
        latitude: -23.6431282,
        longitude: -46.660879,
      })
    }

    const { gyms: gymsPage1 } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gymsPage1).toHaveLength(2)
    expect(gymsPage1).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym 21',
      }),
      expect.objectContaining({
        title: 'Javascript Gym 22',
      }),
    ])
  })
})
