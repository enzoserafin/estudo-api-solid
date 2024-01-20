import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsProfileUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsProfileUseCase()
  const { checkInsCount } = await getUserMetricsUseCase.call({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
