import 'dotenv/config'
import { app } from './app'

const PORT = Number(process.env.PORT) || 3333

app.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`🚀 micare-api rodando em http://localhost:${PORT}`)
})
