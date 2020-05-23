const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
//验证码session,通过session来区分每个用户及其对应验证码 
const userAccountMiddleware = require('./user-acount')


const app = express()
const http = require('http')
const https = require('https')

const server = http.createServer(app)
const servers = https.createServer(app)

const io = require('socket.io')
const ioServer = io(server)
global.ioServer = ioServer

//restaurant需要用到ioServer，所以要放到后面
const restaurantMiddleware = require('./restaurant')


app.use((req,res,next) => {
    console.log(req.method,req.url)
    next()
})

app.use(session({
    secret: 'secret',
    //此处的加密效果与cookie-parser一样，但如果出现不同可能会出bug
    resave: false,
    saveUninitialized: true
}))

app.use(cors({
    origin:true,
    credentials:true,
    maxAge:86400,
}))



app.use(cookieParser('secret'))


app.use(express.static(__dirname + '/build/'))
app.use(express.static(__dirname + '/static/'))//处理静态文件请求的中间件
app.use('/others',express.static(__dirname +  '/others/'))
app.use('/upload',express.static(__dirname +  '/upload/'))

app.use(express.urlencoded({extended:true}))//用于解析拓展url编码的请求体
app.use(express.json())//用于解析json请求体


app.use('/api',userAccountMiddleware)
app.use('/api',restaurantMiddleware)



server.listen(8080,() => {
    console.log('port is listening')
})

//将app导出，然后在其他组件中就能引入就能得到app



