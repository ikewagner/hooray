import { organizationSchema } from '@hooray/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '../../../lib/prisma'
import { getUserPermissions } from '../../../utils/get-user-permissions'
import { auth } from '../../middlewares/auth'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function shutdownOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organization/:slug',
      {
        schema: {
          tags: ['Organização'],
          summary: 'Desligar organização',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const authOrganization = organizationSchema.parse(organization)

        const permissions = getUserPermissions(userId, membership.role)
        if (!permissions) {
          throw new UnauthorizedError(
            `Permissões não encontradas para o usuário.`,
          )
        }

        const { cannot } = permissions

        if (typeof cannot !== 'function') {
          throw new UnauthorizedError(
            `Permissões inválidas retornadas para o usuário.`,
          )
        }

        if (cannot('delete', authOrganization)) {
          throw new UnauthorizedError(
            `Você não tem permissão para encerrar esta organização.`,
          )
        }

        // Delete related records first
        await prisma.member.deleteMany({
          where: {
            organizationId: organization.id,
          },
        })

        await prisma.organization.delete({
          where: {
            id: organization.id,
          },
        })

        return reply.status(204).send()
      },
    )
}
