import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '../../../lib/prisma'
import { getUserPermissions } from '../../../utils/get-user-permissions'
import { auth } from '../../middlewares/auth'
import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function createCompliment(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organization/:slug/create-compliment',
      {
        schema: {
          tags: ['Elogios'],
          summary: 'Criar um novo elogio',
          security: [{ bearerAuth: [] }],
          body: z.object({
            title: z.string(),
            content: z.string(),
            receiverId: z.string(),
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            201: z.object({
              id: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Compliment')) {
          throw new UnauthorizedError(
            `Você não tem permissão para criar novos elogios.`,
          )
        }

        const receiverMembership = await prisma.member.findUnique({
          where: {
            organizationId_userId: {
              organizationId: organization.id,
              userId: request.body.receiverId,
            },
          },
        })

        if (!receiverMembership) {
          throw new BadRequestError(
            'O usuário destinatário não é membro desta organização.',
          )
        }

        const { title, content, receiverId } = request.body

        const compliment = await prisma.compliment.create({
          data: {
            title,
            content,
            organizationId: organization.id,
            ownerId: userId,
            receiverId,
          },
        })

        return reply.status(201).send({
          id: compliment.id,
        })
      },
    )
}
