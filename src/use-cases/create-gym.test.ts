import { expect, describe, test, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  test('should be able to create gym', async () => {
    const { gym } = await sut.call({
      title: 'Fake title',
      description: null,
      phone: null,
      latitude: -25.4334069,
      longitude: -49.256466,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
