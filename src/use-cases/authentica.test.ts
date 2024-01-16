import { hash } from 'bcryptjs'
import { expect, describe, test, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { AuthenticateUseCase } from './authtenticate'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  test('should be able to autheticate', async () => {
    await usersRepository.create({
      name: 'faker name',
      email: 'fake@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.call({
      email: 'fake@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('should not be able to autheticate with wrong email', async () => {
    await expect(() =>
      sut.call({
        email: 'fake@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('should not be able to autheticate with wrong password', async () => {
    await usersRepository.create({
      name: 'faker name',
      email: 'fake@email.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.call({
        email: 'fake@email.com',
        password: '111111',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
