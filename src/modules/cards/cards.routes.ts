import { FastifyInstance } from 'fastify'
import { authenticate } from '../../shared/middlewares/authenticate'
import {
  createCardController, listCardsByPatientController,
  getCardController, updateCardController, deleteCardController
} from './cards.controller'

export async function cardRoutes(app: FastifyInstance) {
  app.post('/cards', { preHandler: [authenticate] }, createCardController)
  app.get('/cards/:id', { preHandler: [authenticate] }, getCardController)
  app.put('/cards/:id', { preHandler: [authenticate] }, updateCardController)
  app.delete('/cards/:id', { preHandler: [authenticate] }, deleteCardController)
  app.get('/patients/:patientId/cards', { preHandler: [authenticate] }, listCardsByPatientController)
}
