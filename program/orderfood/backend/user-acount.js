const fs = require('fs')
const multer = require('multer')
const express = require('express')
// const sharp = require('sharp')

const svgCaptcha = require('svg-captcha')

const fsp = fs.promises
const uploader = multer({
    dest: './avatar',
    preservePath: true,
})

let db
(async function(){
    db = await require('./db')
}())

const changePasswordTokenMap = {}
// const mailer = require('./mailer')

const app = express.Router()

app.route('/register')
    .post(uploader.single('avatar'),async(req,res,next) => {
        var regInfo = req.body

        var user = await db.get('SELECT * FROM users WHERE username=?',regInfo.username)
        
        if(user){
            //     if(req.file){
            //         await fsp.unlink(req.file.path)
            //     }
            //     //如果用户存在且头像已上传，则将刚上传的头像删除
                res.status(401).json({
                    code: -1,
                    msg: '用户名已被占用'
                })
            } else {
            //     if(req.file){
            //         var imgBuf = await fsp.readFile(req.file.path)
            //         await sharp(imgBuf)//把上传的图片变小
            //         .resize(256)
            //         .toFile(req.file.path)
            //     }
            // 以上是对有头像上传时的处理

                await db.run('INSERT INTO users (username,email,password,tittle) VALUES (?,?,?,?)',regInfo.username,regInfo.email,regInfo.password,regInfo.tittle
            )

            res.json({
                code: 0,
                msg: '注册成功！'
            })
        }
    })

app.get('/captcha',(req,res,next) => {
    var captcha = svgCaptcha.create({
        ignoreChars: '0o1il',
        noise: 3
        //设置验证码中不要出现的符号
    })
    req.session.captcha = captcha.text;
	
	res.type('svg');
	res.status(200).send(captcha.data);
    captchaText = captcha.text
})
//登录验证码
app.get('/userinfo',async (req,res,next) => {
    var userid = req.cookies.userid
    console.log(req.cookies)
    if(userid) {
        res.json(await db.get('SELECT id,username,tittle FROM users WHERE id=?',userid))
    } else {
        res.status(404).json({
                code:-1,
                mgs:'不存在此餐厅'
            }
        )
    }
})

app.route('/login')
    .post(async (req,res,next) => {
        var tryLoginInfo = req.body

        if(tryLoginInfo.captcha === req.session.captcha){
            var user = await db.get('SELECT id,username,tittle FROM users WHERE username=? AND password=?',tryLoginInfo.username,tryLoginInfo.password)
    
            if(user){
                res.cookie('userid',user.id)
                res.json(user)
            } else {
                res.status(403).json({
                    code:-1,
                    msg:'用户名不存在或密码错误'
                })
            }
        }else{
            res.status(403).json({
                code:-1,
                msg:'验证码错误'
            })
        }
    })

// app.route('/forgot')
// app.route('/change-password/:token')
// 忘记密码功能与更改密码功能

app.get('/logout',(req,res,next) => {
    res.clearCookie('userid')
    res.json({
        code:0,
        msg:'登出成功！'
    })
})

module.exports = app

//route后一定要接相应的请求方式