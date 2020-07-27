require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
// const app = require('express')()
const server = app.listen(`${process.env.PORT}`)
const io = require('socket.io')(server)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});

const morgan = require('morgan')
const routes = require('./routes/index')

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./routes/users')
// const { get } = require('http')

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(cors())
app.use(morgan('dev'))
app.use('/', routes.chat)
app.use('/doctors', routes.doctors)
app.use('/patients', routes.patients)
app.use('/professions', routes.professions)
app.use('/invitations', routes.invitations)
app.use('/login', routes.login)

io.on('connect', (socket) => {
  socket.on('join', ({ name, room, isDoctor }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, isDoctor })

    if (error) return callback('error: ', error)

    socket.join(user.room)

    if(isDoctor !== 'true'){
      socket.emit('message', {
        user: 'Doctalk',
        text: `${user.name}, wait the doctor response...`,
      })
    }

    let d = new Date();
    let date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        console.log(date);

    socket.broadcast
      .to(user.room)
      .emit('message', { user: date, text: `${user.name} has joined!` })

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', { user: user.name, text: message })

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Doctor',
        text: `${user.name} has left.`,
      })
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }
  })
})