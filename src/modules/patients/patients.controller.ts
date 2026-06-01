import { FastifyRequest, FastifyReply } from 'fastify'
import {
  createPatientSchema, updatePatientSchema, searchPatientSchema
} from './patients.schema'
import {
  createPatientService, listPatientsService, getPatientByIdService,
  searchPatientPublicService, updatePatientService, deletePatientService
} from './patients.service'

export async function createPatientController(request: FastifyRequest, reply: FastifyReply) {
  const data = createPatientSchema.parse(request.body)
  const patient = await createPatientService(data)
  return reply.status(201).send(patient)
}

export async function listPatientsController(request: FastifyRequest, reply: FastifyReply) {
  const { q } = request.query as { q?: string }
  const patients = await listPatientsService(q)
  return reply.send(patients)
}

export async function getPatientController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const patient = await getPatientByIdService(id)
  return reply.send(patient)
}

// Rota pública — paciente busca o próprio cartão
export async function searchPatientPublicController(request: FastifyRequest, reply: FastifyReply) {
  const { q, cpf, accessCode } = request.query as {
    q?: string; cpf?: string; accessCode?: string
  }
  const patient = await searchPatientPublicService({ name: q, cpf, accessCode })
  return reply.send(patient)
}

export async function updatePatientController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  const data = updatePatientSchema.parse(request.body)
  const patient = await updatePatientService(id, data)
  return reply.send(patient)
}

export async function deletePatientController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }
  await deletePatientService(id)
  return reply.status(204).send()
}
