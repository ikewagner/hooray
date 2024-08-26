import { z } from 'zod'

export const complimentSchema = z.object({
  __typename: z.literal('Compliment').default('Compliment'),
  id: z.string(),
  ownerId: z.string(),
})

export type Compliment = z.infer<typeof complimentSchema>
