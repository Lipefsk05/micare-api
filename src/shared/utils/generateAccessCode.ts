import { randomBytes } from 'crypto'

// Gera um código único de 8 caracteres alfanumérico para a paciente
export function generateAccessCode(): string {
  return randomBytes(4).toString('hex').toUpperCase() // ex: "A3F2C1B9"
}
