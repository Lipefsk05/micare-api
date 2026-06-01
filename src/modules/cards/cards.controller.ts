import { FastifyRequest, FastifyReply } from 'fastify'
import { createCardSchema, updateCardSchema } from './cards.schema'
import {
  createCardService, listCardsByPatientService,
  getCardByIdService, updateCardService, deleteCardService
} from './cards.service'

export async function createCardController(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user as { sub: string }
  const data = createCardSchema.parse(request.body)
  const card = await createCardService(sub, data)
  return reply.status(201).send(card)
}

export async function listCardsByPatientController(request: FastifyRequest, reply: FastifyReply) {
  const { patientId } = request.params as { patientId: string }
  const cards = await listCardsByPatientService(patientId)
  return reply.send(cards)
}

export async function getCardController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const card = await getCardByIdService(id)
  return reply.send(card)
}

export async function updateCardController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const data = updateCardSchema.parse(request.body)
  const card = await updateCardService(id, data)
  return reply.send(card)
}

export async function deleteCardController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  await deleteCardService(id)
  return reply.status(204).send()
}
