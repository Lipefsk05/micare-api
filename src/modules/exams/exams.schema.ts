import { z } from 'zod'
import { EXAM_TYPES } from '../../shared/utils/examTypes'

export const upsertExamSchema = z.object({
  type: z.enum(EXAM_TYPES),
  date: z.string().transform((v) => new Date(v)).optional(),
  result1: z.string().optional(),
  date1: z.string().transform((v) => new Date(v)).optional(),
  result2: z.string().optional(),
  date2: z.string().transform((v) => new Date(v)).optional(),
  result3: z.string().optional(),
  date3: z.string().transform((v) => new Date(v)).optional(),
})

export type UpsertExamInput = z.infer<typeof upsertExamSchema>
