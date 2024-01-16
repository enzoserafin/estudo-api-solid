import { expect, describe, test, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  test('should be able to fetch for gyms', async () => {
    await gymsRepository.create({
      title: 'Dart gym',
      description: null,
      phone: null,
      latitude: -25.4334069,
      longitude: -49.256466,
    })

    await gymsRepository.create({
      title: 'Flutter gym',
      description: null,
      phone: null,
      latitude: -25.4334069,
      longitude: -49.256466,
    })

    const { gyms } = await sut.call({ query: 'Dart', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Dart gym' })])
  })

  test('should to be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Flutter gym ${i}`,
        description: null,
        phone: null,
        latitude: -25.4334069,
        longitude: -49.256466,
      })
    }

    const { gyms } = await sut.call({ query: 'Flutter', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Flutter gym 21' }),
      expect.objectContaining({ title: 'Flutter gym 22' }),
    ])
  })
})
