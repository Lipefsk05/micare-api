import { z } from 'zod'

export const createPatientSchema = z.object({
  name: z.string().min(3),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos (sem pontuação)'),
  birthDate: z.string().transform((val) => new Date(val)),
  phone: z.string().optional(),
  emergencyPhone: z.string().optional(),
})

export const updatePatientSchema = createPatientSchema.partial()

export const searchPatientSchema = z.object({
  q: z.string().optional(),           // busca por nome
  cpf: z.string().optional(),
  accessCode: z.string().optional(),
})

export type CreatePatientInput = z.infer<typeof createPatientSchema>
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>
