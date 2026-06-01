import prisma from '../../config/prisma'
import { AppError } from '../../shared/errors/AppError'
import { ExamTypeValue } from '../../shared/utils/examTypes'
import { UpsertExamInput } from './exams.schema'

async function assertCardExists(cardId: string) {
  const card = await prisma.prenatalCard.findUnique({ where: { id: cardId } })
  if (!card) throw new AppError('Cartão não encontrado.', 404)
}

export async function upsertExamService(cardId: string, data: UpsertExamInput) {
  await assertCardExists(cardId)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const type = data.type as any
  return prisma.exam.upsert({
    where: { cardId_type: { cardId, type } },
    create: { cardId, ...data, type },
    update: { ...data, type },
  })
}

export async function listExamsService(cardId: string) {
  await assertCardExists(cardId)
  return prisma.exam.findMany({
    where: { cardId },
    orderBy: { type: 'asc' },
  })
}

export async function deleteExamService(cardId: string, type: ExamTypeValue) {
  await assertCardExists(cardId)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const examType = type as any
  const exam = await prisma.exam.findUnique({
    where: { cardId_type: { cardId, type: examType } },
  })
  if (!exam) throw new AppError('Exame não encontrado.', 404)
  await prisma.exam.delete({ where: { cardId_type: { cardId, type: examType } } })
}
