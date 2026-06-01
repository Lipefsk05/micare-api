import { z } from 'zod'

export const createCardSchema = z.object({
  patientId: z.string().uuid(),
  pnrh: z.string().optional(),
  pnarPor: z.string().optional(),
  dum: z.string().transform((v) => new Date(v)).optional(),
  dpp: z.string().transform((v) => new Date(v)).optional(),
  firstUsg: z.string().transform((v) => new Date(v)).optional(),
  igWeeks: z.number().int().optional(),
  gestacoes: z.number().int().optional(),
  partosCesareos: z.number().int().optional(),
  partosNormais: z.number().int().optional(),
  abortos: z.number().int().optional(),
  hpp: z.string().optional(),
  hgo: z.string().optional(),
  hs: z.string().optional(),
  hf: z.string().optional(),
})

export const updateCardSchema = createCardSchema.omit({ patientId: true }).partial()

export type CreateCardInput = z.infer<typeof createCardSchema>
export type UpdateCardInput = z.infer<typeof updateCardSchema>
