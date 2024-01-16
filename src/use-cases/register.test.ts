import { compare } from 'bcryptjs'
import { expect, describe, test, beforeEach } from 'vitest'

import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  test('should be able to register', async () => {
    const { user } = await sut.call({
      name: 'Fake name',
      email: 'fakeemail@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('should hash user password upon registration', async () => {
    const { user } = await sut.call({
      name: 'Fake name',
      email: 'fakeemail@email.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  test('should not be able to register with same email twice', async () => {
    const email = 'fakeemail@email.com'

    await sut.call({
      name: 'Fake name',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.call({
        name: 'Fake name',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
