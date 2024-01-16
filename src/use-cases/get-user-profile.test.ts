import { hash } from 'bcryptjs'
import { expect, describe, test, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  test('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'faker name',
      email: 'fake@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.call({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('should not be able to get user profile', async () => {
    await expect(() =>
      sut.call({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
