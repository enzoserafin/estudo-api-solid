import { expect, describe, test, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from './check-in'

import { MaxDistanceError } from './erros/max-distance-error'
import { MaxNumberOfCheckInsError } from './erros/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Fake title',
      description: null,
      phone: null,
      latitude: -25.4334069,
      longitude: -49.256466,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('should be able to check in', async () => {
    const { checkIn } = await sut.call({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -25.4334069,
      userLongitude: -49.256466,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.call({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -25.4334069,
      userLongitude: -49.256466,
    })

    await expect(() =>
      sut.call({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -25.4334069,
        userLongitude: -49.256466,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  test('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.call({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -25.4334069,
      userLongitude: -49.256466,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.call({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -25.4334069,
      userLongitude: -49.256466,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('should not be able to check in on distant gym', async () => {
    await gymsRepository.create({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: -25.4334069,
      longitude: -49.256466,
    })

    await expect(() =>
      sut.call({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -25.4039405,
        userLongitude: -49.2963801,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
