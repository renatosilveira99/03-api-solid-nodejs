import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymsQuerySchema.parse(request.query)

  const makeSearchGyms = makeSearchGymsUseCase()

  const { gyms } = await makeSearchGyms.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
