import { FastifyInstance } from 'fastify'
import { authenticate } from '../../shared/middlewares/authenticate'
import { registerController, loginController, getMeController } from './auth.controller'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/register', registerController)
  app.post('/auth/login', loginController)
  app.get('/auth/me', { preHandler: [authenticate] }, getMeController)
}
