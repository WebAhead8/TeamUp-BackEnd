const express = require('express')
const PORT = process.env.PORT || 4000
const rooms = require('./handlers/rooms')
const cors = require('cors')
const gamesHandler = require('./handlers/games')
const postsHandler = require('./handlers/posts')
const users = require('./handlers/users')
const errorHandler = require('./middleware/error')
const avatarIcon = require('./handlers/avatarIcon')

const server = express()
server.use(express.urlencoded())
server.use(express.json())
server.use(cors())
server.use(errorHandler)

server.get('/', (reg, res) => {
  res.send('<h1> Welcome To TeamUp API </h1>')
})

//users:
server.get('/users', users.getAll)
server.get('/users/:id', users.get)
server.get('/user/:username', users.getUserByUsername)
server.get('/login/me', users.getUserByToken)
server.delete('/users/:id', users.delusers)
server.post('/update/username', users.updateUsername)
server.post('/update/email', users.updateEmail)
server.post('/update/platforms', users.updatePlatforms)
server.post('/update/gameslist', users.updateGamesList)
server.post('/update/password', users.updatePassword)
server.post('/update/avatarimg', users.updateAvatarImg)
server.post('/users', users.postUsers)
server.post('/login', users.login)

// Rooms Requests
server.get('/rooms', rooms.getAllRooms)
server.get('/rooms/:id', rooms.getRoomsId)
server.get('/grooms/:id', rooms.getRoomsByGame)
server.post('/rooms', rooms.addRoom)
server.post('/rooms/:id', rooms.updateGamersRoom)
server.delete('/rooms/:id', rooms.delRoom)

//games
server.get('/games/', gamesHandler.getAllGames)
server.get('/game/:id', gamesHandler.getGameById)
server.get('/games/:gname', gamesHandler.autocomplete)
server.post('/addGame', gamesHandler.addNewGame)
server.delete('/game/:id', gamesHandler.deleteGame)

//posts
server.get('/AllPosts', postsHandler.getAllPosts)
server.get('/posts/:id', postsHandler.getUsersPost)
server.post('/addPost', postsHandler.addNewPost)
server.delete('/post/:id', postsHandler.deletePost)

//avatarIcon
server.get('/avatarImg', avatarIcon.getAvatarImg)

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
