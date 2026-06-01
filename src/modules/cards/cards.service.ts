import prisma from '../../config/prisma'
import { AppError } from '../../shared/errors/AppError'
import { CreateCardInput, UpdateCardInput } from './cards.schema'

export async function createCardService(doctorId: string, data: CreateCardInput) {
  const patient = await prisma.patient.findUnique({ where: { id: data.patientId } })
  if (!patient) throw new AppError('Paciente não encontrada.', 404)

  return prisma.prenatalCard.create({
    data: { ...data, doctorId },
    include: { patient: true, exams: true, consultations: true },
  })
}

export async function listCardsByPatientService(patientId: string) {
  return prisma.prenatalCard.findMany({
    where: { patientId },
    include: {
      exams: { orderBy: { type: 'asc' } },
      consultations: { orderBy: { consultNumber: 'asc' } },
      doctor: { select: { name: true, crm: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getCardByIdService(id: string) {
  const card = await prisma.prenatalCard.findUnique({
    where: { id },
    include: {
      patient: true,
      doctor: { select: { name: true, crm: true } },
      exams: { orderBy: { type: 'asc' } },
      consultations: { orderBy: { consultNumber: 'asc' } },
    },
  })
  if (!card) throw new AppError('Cartão não encontrado.', 404)
  return card
}

export async function updateCardService(id: string, data: UpdateCardInput) {
  await getCardByIdService(id)
  return prisma.prenatalCard.update({
    where: { id },
    data,
    include: { exams: true, consultations: true },
  })
}

export async function deleteCardService(id: string) {
  await getCardByIdService(id)
  await prisma.prenatalCard.delete({ where: { id } })
}
