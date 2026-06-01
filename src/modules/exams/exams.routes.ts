import { FastifyInstance } from 'fastify'
import { authenticate } from '../../shared/middlewares/authenticate'
import { upsertExamController, listExamsController, deleteExamController } from './exams.controller'

export async function examRoutes(app: FastifyInstance) {
  // PUT porque é upsert — cria se não existe, atualiza se já existe
  app.put('/cards/:cardId/exams', { preHandler: [authenticate] }, upsertExamController)
  app.get('/cards/:cardId/exams', { preHandler: [authenticate] }, listExamsController)
  app.delete('/cards/:cardId/exams/:type', { preHandler: [authenticate] }, deleteExamController)
}
