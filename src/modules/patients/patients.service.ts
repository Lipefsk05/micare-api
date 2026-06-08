import prisma from '../../config/prisma'
import { AppError } from '../../shared/errors/AppError'
import { generateAccessCode } from '../../shared/utils/generateAccessCode'
import { computeGestationalAge } from '../../shared/utils/gestation'
import { CreatePatientInput, UpdatePatientInput } from './patients.schema'

export async function createPatientService(data: CreatePatientInput) {
  const existing = await prisma.patient.findUnique({ where: { cpf: data.cpf } })
  if (existing) throw new AppError('CPF já cadastrado.', 409)

  // Gera código único
  let accessCode = generateAccessCode()
  while (await prisma.patient.findUnique({ where: { accessCode } })) {
    accessCode = generateAccessCode()
  }

  return prisma.patient.create({
    data: { ...data, accessCode },
  })
}

export async function listPatientsService(search?: string) {
  return prisma.patient.findMany({
    where: search
      ? { name: { contains: search, mode: 'insensitive' } }
      : undefined,
    orderBy: { name: 'asc' },
    select: {
      id: true, name: true, cpf: true, birthDate: true,
      phone: true, emergencyPhone: true, accessCode: true, createdAt: true,
    },
  })
}

export async function getPatientByIdService(id: string) {
  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      prenatalCards: {
        include: {
          exams: { orderBy: { type: 'asc' } },
          consultations: { orderBy: { consultNumber: 'asc' }, select: {
            id: true, cardId: true, consultNumber: true, date: true, complaint: true,
            conduta: true,
            ss: true, weight: true, pa: true, ai: true, touch: true, signature: true,
            returnDate: true, createdAt: true, updatedAt: true
          } },
        },
      },
    },
  })
  if (!patient) throw new AppError('Paciente não encontrada.', 404)
  // add ig to each prenatal card
  const cards = patient.prenatalCards.map((c) => ({ ...c, ig: computeGestationalAge(c.dum ?? undefined) }))
  return { ...patient, prenatalCards: cards }
}

export async function searchPatientPublicService(params: {
  cpf?: string
  accessCode?: string
  name?: string
}) {
  const { cpf, accessCode, name } = params

  if (!cpf && !accessCode && !name) {
    throw new AppError('Informe ao menos um critério de busca.', 400)
  }

  const patient = await prisma.patient.findFirst({
    where: {
      OR: [
        cpf ? { cpf } : undefined,
        accessCode ? { accessCode } : undefined,
        name ? { name: { contains: name, mode: 'insensitive' } } : undefined,
      ].filter(Boolean) as object[],
    },
    include: {
      prenatalCards: {
        include: {
          exams: { orderBy: { type: 'asc' } },
          consultations: { orderBy: { consultNumber: 'asc' }, select: {
            id: true, cardId: true, consultNumber: true, date: true, complaint: true,
            conduta: true,
            ss: true, weight: true, pa: true, ai: true, touch: true, signature: true,
            returnDate: true, createdAt: true, updatedAt: true
          } },
          doctor: { select: { name: true, crm: true } },
        },
      },
    },
  })

  if (!patient) throw new AppError('Paciente não encontrada.', 404)
  const cards = patient.prenatalCards.map((c) => ({ ...c, ig: computeGestationalAge(c.dum ?? undefined) }))
  return { ...patient, prenatalCards: cards }
}

export async function updatePatientService(id: string, data: UpdatePatientInput) {
  await getPatientByIdService(id)
  return prisma.patient.update({ where: { id }, data })
}

export async function deletePatientService(id: string) {
  await getPatientByIdService(id)
  await prisma.patient.delete({ where: { id } })
}
