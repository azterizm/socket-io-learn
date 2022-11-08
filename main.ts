import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000
const io = new Server(server)

app.get('/', (_, res) => {
  res.sendFile(path.resolve('chat.html'))
})

io.on('connection', (s) => {
  s.on('disconnect', (r: string) => {
    console.log('user disconnected:', r)
  })
  //receive message
  s.on('chat message', (message: string) => {
    console.log('recieved message:', message)
    //send message
    io.emit('chat message', message)
  })

  console.log('a user has connected')
})

server.listen(port, () => console.log('listening on port', port))
