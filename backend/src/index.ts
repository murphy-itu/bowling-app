import express from 'express'
import gameRouter from './routes/game.route.ts'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());

app.use("/game", gameRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
