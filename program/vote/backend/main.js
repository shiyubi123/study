const express = require('express')
const body = require('body-parser')
// const session = require('express-session')
const router = require('./router/index.js')
const cors = require('cors')
const http = require('http')

const app = express()
const server = http.createServer(app);
const io = require('socket.io')(server);

const {Users,Topics} = require('./database/database.js')


app.use(cors({
    origin: 'http://192.168.124.42:8080',
    credentials:true
}))

app.use(router)

//接收数据
io.on('connection', socket => {
    console.log('socket is connecting')
    socket.on('vote', data => {
        console.log('some is voted');
        // 发送数据
        Topics.findOne({topictittle:data.tittle},function(err,docs){
            const chooses = docs.chooses.forEach(item => {
                if(item.voteName === data.choose){
                    item.voteNumber += 1
                }
            });
            docs.update({chooses:chooses})
            docs.save(function(err,docs){
                if(err){
                    return io.emit('result', {
                        msg: err,
                        code: 200
                    }); 
                } else {
                    return io.emit('result', {
                        msg: docs.chooses,
                        code: 200
                    }); 
                }
            })
        })
    })
});

const port = 8079
server.listen(port,function(){
    console.log(`port ${port} is listening`)
})