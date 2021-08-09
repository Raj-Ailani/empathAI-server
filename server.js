import { app } from './app.js'
import config from './config/index.js'
import { connect } from './config/db.js'


const start = async () => {
  console.log('Process Environment:Succes ')
  try {
    await connect().then(console.log('Database Connected'))
    app.listen(config.PORT, () => {
      console.log(`REST API on http://localhost:${config.PORT}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}

start()