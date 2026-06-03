import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { AppError } from './shared/errors/AppError'

import { authRoutes } from './modules/auth/auth.routes'
import { patientRoutes } from './modules/patients/patients.routes'
import { cardRoutes } from './modules/cards/cards.routes'
import { examRoutes } from './modules/exams/exams.routes'
import { consultationRoutes } from './modules/consultations/consultations.routes'

export const app = Fastify({ logger: true })

// Plugins
app.register(cors, {
  origin: [
    'http://localhost:3000',
    'https://micareweb.vercel.app',
  ],
  credentials: true,
})
app.register(jwt, { secret: process.env.JWT_SECRET ?? 'micare_secret_dev' })

// Rotas
app.register(authRoutes, { prefix: '/api' })
app.register(patientRoutes, { prefix: '/api' })
app.register(cardRoutes, { prefix: '/api' })
app.register(examRoutes, { prefix: '/api' })
app.register(consultationRoutes, { prefix: '/api' })

// Health check
app.get('/health', () => ({ status: 'ok', app: 'micare-api' }))

// Handler global de erros
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(422).send({
      message: 'Erro de validação.',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message })
  }

  app.log.error(error)
  return reply.status(500).send({ message: 'Erro interno do servidor.' })
})
