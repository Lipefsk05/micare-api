import { FastifyInstance } from 'fastify'
import { authenticate } from '../../shared/middlewares/authenticate'
import {
  upsertConsultationController, listConsultationsController,
  getConsultationController, deleteConsultationController
} from './consultations.controller'

export async function consultationRoutes(app: FastifyInstance) {
  app.put('/cards/:cardId/consultations', { preHandler: [authenticate] }, upsertConsultationController)
  app.get('/cards/:cardId/consultations', { preHandler: [authenticate] }, listConsultationsController)
  app.get('/cards/:cardId/consultations/:number', { preHandler: [authenticate] }, getConsultationController)
  app.delete('/cards/:cardId/consultations/:number', { preHandler: [authenticate] }, deleteConsultationController)
}
