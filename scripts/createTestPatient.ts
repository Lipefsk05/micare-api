import prisma from '../src/config/prisma'

async function main() {
  // ensure a doctor exists
  let doctor = await prisma.user.findFirst()
  if (!doctor) {
    doctor = await prisma.user.create({
      data: {
        name: 'Dra Teste',
        email: `drtest+${Date.now()}@example.com`,
        password: 'password',
        crm: `CRM${Date.now() % 100000}`,
      },
    })
  }

  const accessCode = 'd345f980-c2f2-41d1-9213-0f28f5910deb'

  // create patient with prenatal card, a consultation and an exam
  const patient = await prisma.patient.create({
    data: {
      name: 'Paciente Teste Público',
      cpf: `00000000000${Date.now() % 1000}`,
      birthDate: new Date('1990-01-01'),
      phone: '11999999999',
      emergencyPhone: '11988888888',
      accessCode,
      prenatalCards: {
        create: {
          doctorId: doctor.id,
          pnarPor: 'Unidade X',
          dum: new Date('2026-01-01'),
          dpp: new Date('2026-10-08'),
          firstUsg: new Date('2026-02-01'),
          igWeeks: 20,
          gestacoes: 1,
          consultations: {
            create: [{ consultNumber: 1, date: new Date('2026-02-01'), complaint: 'Queixa teste' }],
          },
          exams: {
            create: [{ type: 'GS', result1: 'Positivo', date1: new Date('2026-02-01') }],
          },
        },
      },
    },
    include: { prenatalCards: true },
  })

  console.log('Created test patient with id:', patient.id)
  console.log('Access code:', accessCode)
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
