import { FastifyInstance } from 'fastify'
import { authenticate } from '../../shared/middlewares/authenticate'
import {
  createPatientController, listPatientsController, getPatientController,
  searchPatientPublicController, updatePatientController, deletePatientController
} from './patients.controller'

export async function patientRoutes(app: FastifyInstance) {
  // Rota PÚBLICA — paciente busca o próprio cartão (sem login)
  app.get('/patients/search', searchPatientPublicController)

  // Rotas PRIVADAS — apenas médicos autenticados
  app.post('/patients', { preHandler: [authenticate] }, createPatientController)
  app.get('/patients', { preHandler: [authenticate] }, listPatientsController)
  app.get('/patients/:id', { preHandler: [authenticate] }, getPatientController)
  app.put('/patients/:id', { preHandler: [authenticate] }, updatePatientController)
  app.delete('/patients/:id', { preHandler: [authenticate] }, deletePatientController)
}
