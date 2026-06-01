import { FastifyRequest, FastifyReply } from 'fastify'
import { registerSchema, loginSchema } from './auth.schema'
import { registerService, loginService, getMeService } from './auth.service'

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
  const data = registerSchema.parse(request.body)
  const user = await registerService(data)
  return reply.status(201).send(user)
}

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
  const data = loginSchema.parse(request.body)
  const user = await loginService(data)

  const token = await reply.jwtSign({ sub: user.id, name: user.name }, { expiresIn: '8h' })

  return reply.send({ token, user })
}

export async function getMeController(request: FastifyRequest, reply: FastifyReply) {
  const payload = request.user as { sub: string }
  const user = await getMeService(payload.sub)
  return reply.send(user)
}
