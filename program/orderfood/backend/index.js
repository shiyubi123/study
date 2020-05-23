const http = require('http')
const server = http.createServer()

const io = require('socket.io')
const ioServer = io(server)

global.ioServer = ioServer

const app = require('./app')

server.on('request',app)

//注意调用顺序，1 先创建httpserver，2 然后通过httpserver创建ioserver并放到全局，3 然后请求app（因为app中调用了restaurant，而restaurant又调用了io，所以必须放在后面），4 最后将app挂到server上

// httpServer.on('request',app)
// //expres的app就是用于传给http的request事件的

const port = 8406 

server.listen(port,() => {
    console.log('server is listened on port:',port)
})