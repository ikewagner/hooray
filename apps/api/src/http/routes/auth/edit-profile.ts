import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '../../../lib/prisma'
import { BadRequestError } from '../_errors/bad-request-error'

export async function editProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/edit-profile',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Editar o perfil do usuário',
        body: z.object({
          name: z.string(),
          avatarUrl: z.string().url().nullable(),
        }),
      },
    },
    async (request, reply) => {
      const { sub } = await request.jwtVerify<{ sub: string }>()

      const updatedUser = await prisma.user.update({
        where: {
          id: sub,
        },
        data: {
          name: request.body.name,
          avatarUrl: request.body.avatarUrl,
          updatedAt: new Date(),
        },
      })

      if (!updatedUser) {
        throw new BadRequestError('Usuário não encontrado.')
      }

      return reply.send({ user: updatedUser })
    },
  )
}
