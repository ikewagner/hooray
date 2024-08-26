import { z } from 'zod'

import { complimentSchema } from './../models/compliment'

export const complimentSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Compliment'), complimentSchema]),
])

export type ComplimentSubject = z.infer<typeof complimentSubject>
