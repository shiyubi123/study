var express = require('express')
var cookieParser = require('cookie-parser')

var port = 8406

var app = express()

var users = [
    {
        username:'1',
        password:'1',
        email:'1',
    },{
        username:'2',
        password:'2',
        email:'2',
    },
]

var cookieCache = {}

app.use((req,res,next) => {
    res.set('Content-Type','text/html;charset=UTF-8')
    next()
})
app.use(express.static(__dirname + '/static'))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser('lzy'))


app.get('/',(req,res,next) => {
    res.send(`
        <div>
            <a href='/login'>登录</a>
            <a href='/registe'>注册</a>
        </div>
    `)
})

app.route('/login')
    .get((req,res,next) => {
        if(req.signedCookies.username){
                res.write(`<script>window.location.href='/voteIA';</script>`)
        }else{
            res.send(`
            <form id='login' action='/login' method='post'>
                    用户名<input type='text' name='username'>
                    密码<input type='password' name='password'>
                    <button>登录<botton>
            </form>

            <script>
                login.onsubmit = e => {
                    e.preventDefault()
                    var username = document.querySelector.('[name = "username"]').value
                    var password = document.querySelector.('[name = "password"]').value
                }

                var xhr = new XMLHttpRquest()
                xhr.open('POST','/login')
                xhr.onload = () => {
                    var data = JSON.parse(xhr.responseText)
                    if(data.code == 0){
                        alert('登录成功')
                        location.href = '/voteIA'
                    }else{
                        alert('登录失败，用户名不存在或密码错误')
                    }
                }
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded';charset='UTF-8')
                xhr.send('username=' + username + '&password=' + password)
            </script>
            `)
        }
    })
    .post((req,res,next) => {
        if(users.findIndex((val) => {return val.username == req.body.username && val.password == req.body.password}) >= 0){
            res.json({code:0})
            return
            // res.cookie('username',req.body.username,{signed:true})
            // setTimeout(() => {
            //     res.write(`<script>window.location.href='/voteIA';</script>`)
            //     res.end()
            // }, 1000);
            // res.write('登录成功!')
        }else{
            res.json({code:-1})
            return
            // res.end('用户名不存在或密码错误')
        }
    })

app.route('/registe')
    .get((req,res,next) => {
        res.send(`
        <form action='/registe' method='post'>
            用户名<input type='text' name='username'>
            密码<input type='password' name='password'>
            邮箱<input type='text' name='email'>
            <button>注册<botton>
        </form>
    `)
    })
    .post((req,res,next) => {
        if(users.findIndex((val) => {return val.username == req.body.username}) >= 0){
            res.end('用户名已被占用')
        }else{
            users.push(req.body)
            setTimeout(() => {
                res.write(`<script>window.location.href='/';</script>`)
                res.end()
            }, 1000);
            res.write('注册成功!')
        }
    })
    

app.route('/voteIA')
    .get((req,res,next) => {
        res.send(`
            <div>
                <a href=''>创建投票项目</a>
                <a href='/logout'>登出</a>
            </div>
            `)
    })
    .post((req,res,next) => {
        
    })

app.get('/logout',(req,res,next) => {
    res.clearCookie('username')
    res.redirect('/')
})


app.listen(port,() => {console.log('port ' + port + ' is listened')})