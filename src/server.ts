import app from "./app.ts";
import { initDb } from "./db/initSetup.ts"

const PORT = process.env.PORT || 5000;
async function bootstrap() {
  await initDb()               // DATABASE INITALIZATION IF NOT PRESENTSS
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

bootstrap().catch(err => {
  console.error("Fatal startup error", err)
  process.exit(1)
})