import { FastifyInstance } from 'fastify'
import { register } from './controllers/register-controller'
import { authtenticate } from './controllers/authenticate-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authtenticate)
}
