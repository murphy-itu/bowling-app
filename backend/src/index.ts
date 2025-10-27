import express from 'express'
import gameRouter from './routes/game.route.js'
import cors from 'cors'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors());

app.use(express.json());

app.use("/game", gameRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
