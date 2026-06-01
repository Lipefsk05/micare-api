import bcrypt from 'bcryptjs'
import prisma from '../../config/prisma'
import { AppError } from '../../shared/errors/AppError'
import { RegisterInput, LoginInput } from './auth.schema'

export async function registerService(data: RegisterInput) {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } })
  if (existingUser) throw new AppError('E-mail já cadastrado.', 409)

  const existingCrm = await prisma.user.findUnique({ where: { crm: data.crm } })
  if (existingCrm) throw new AppError('CRM já cadastrado.', 409)

  const passwordHash = await bcrypt.hash(data.password, 10)

  const user = await prisma.user.create({
    data: { name: data.name, email: data.email, password: passwordHash, crm: data.crm },
    select: { id: true, name: true, email: true, crm: true, createdAt: true },
  })

  return user
}

export async function loginService(data: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: data.email } })
  if (!user) throw new AppError('Credenciais inválidas.', 401)

  const passwordMatch = await bcrypt.compare(data.password, user.password)
  if (!passwordMatch) throw new AppError('Credenciais inválidas.', 401)

  return { id: user.id, name: user.name, email: user.email, crm: user.crm }
}

export async function getMeService(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, crm: true, createdAt: true },
  })
  if (!user) throw new AppError('Usuário não encontrado.', 404)
  return user
}
