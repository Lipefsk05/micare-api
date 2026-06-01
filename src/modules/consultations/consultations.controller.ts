import { FastifyRequest, FastifyReply } from 'fastify'
import { upsertConsultationSchema } from './consultations.schema'
import {
  upsertConsultationService, listConsultationsService,
  getConsultationService, deleteConsultationService
} from './consultations.service'

export async function upsertConsultationController(request: FastifyRequest, reply: FastifyReply) {
  const { cardId } = request.params as { cardId: string }
  const data = upsertConsultationSchema.parse(request.body)
  const consultation = await upsertConsultationService(cardId, data)
  return reply.status(200).send(consultation)
}

export async function listConsultationsController(request: FastifyRequest, reply: FastifyReply) {
  const { cardId } = request.params as { cardId: string }
  const consultations = await listConsultationsService(cardId)
  return reply.send(consultations)
}

export async function getConsultationController(request: FastifyRequest, reply: FastifyReply) {
  const { cardId, number } = request.params as { cardId: string; number: string }
  const consultation = await getConsultationService(cardId, Number(number))
  return reply.send(consultation)
}

export async function deleteConsultationController(request: FastifyRequest, reply: FastifyReply) {
  const { cardId, number } = request.params as { cardId: string; number: string }
  await deleteConsultationService(cardId, Number(number))
  return reply.status(204).send()
}
