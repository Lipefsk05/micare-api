import { FastifyRequest, FastifyReply } from 'fastify'
import { ExamTypeValue } from '../../shared/utils/examTypes'
import { upsertExamSchema } from './exams.schema'
import { upsertExamService, listExamsService, deleteExamService } from './exams.service'

export async function upsertExamController(request: FastifyRequest, reply: FastifyReply) {
  const { cardId } = request.params as { cardId: string }
  const data = upsertExamSchema.parse(request.body)
  const exam = await upsertExamService(cardId, data)
  return reply.status(200).send(exam)
}

export async function listExamsController(request: FastifyRequest, reply: FastifyReply) {
  const { cardId } = request.params as { cardId: string }
  const exams = await listExamsService(cardId)
  return reply.send(exams)
}

export async function deleteExamController(request: FastifyRequest, reply: FastifyReply) {
  const { cardId, type } = request.params as { cardId: string; type: ExamTypeValue }
  await deleteExamService(cardId, type)
  return reply.status(204).send()
}
