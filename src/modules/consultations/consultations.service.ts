import prisma from '../../config/prisma'
import { AppError } from '../../shared/errors/AppError'
import { UpsertConsultationInput } from './consultations.schema'

async function assertCardExists(cardId: string) {
  const card = await prisma.prenatalCard.findUnique({ where: { id: cardId } })
  if (!card) throw new AppError('Cartão não encontrado.', 404)
}

export async function upsertConsultationService(cardId: string, data: UpsertConsultationInput) {
  await assertCardExists(cardId)
  const { consultNumber, ...rest } = data
  return prisma.consultation.upsert({
    where: { cardId_consultNumber: { cardId, consultNumber } },
    create: { cardId, consultNumber, ...rest },
    update: { ...rest },
  })
}

export async function listConsultationsService(cardId: string) {
  await assertCardExists(cardId)
  return prisma.consultation.findMany({
    where: { cardId },
    orderBy: { consultNumber: 'asc' },
  })
}

export async function getConsultationService(cardId: string, consultNumber: number) {
  const consultation = await prisma.consultation.findUnique({
    where: { cardId_consultNumber: { cardId, consultNumber } },
  })
  if (!consultation) throw new AppError('Consulta não encontrada.', 404)
  return consultation
}

export async function deleteConsultationService(cardId: string, consultNumber: number) {
  await getConsultationService(cardId, consultNumber)
  await prisma.consultation.delete({
    where: { cardId_consultNumber: { cardId, consultNumber } },
  })
}
