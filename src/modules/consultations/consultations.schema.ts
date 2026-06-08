import { z } from 'zod'

export const upsertConsultationSchema = z.object({
  consultNumber: z.number().int().min(1).max(11),
  date: z.string().transform((v) => new Date(v)).optional(),
  complaint: z.string().optional(),
  ss: z.string().optional(),
  weight: z.number().positive().optional(),
  pa: z.string().optional(),
  ai: z.string().optional(),
  touch: z.string().optional(),
  signature: z.string().optional(),
  conduta: z.string().optional(),
  returnDate: z.string().transform((v) => new Date(v)).optional(),
})

export type UpsertConsultationInput = z.infer<typeof upsertConsultationSchema>
