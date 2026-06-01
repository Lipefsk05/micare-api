import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { AppError } from '../errors/AppError'

export function errorHandler(
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof ZodError) {
    return reply.status(422).send({
      statusCode: 422,
      error: 'Validation Error',
      issues: error.flatten().fieldErrors,
    })
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.message,
    })
  }

  console.error(error)
  return reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
  })
}
