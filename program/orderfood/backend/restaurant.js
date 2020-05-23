const express = require('express')

const multer = require('multer')
//图片上传
const path = require('path')
//获取图片文件拓展名
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname))
    }
})
const uploader = multer({
    storage:storage,
})

var deskCartMap = new Map()
var deskTotal = new Map()
var deskIn = new Map()
//sockect连接需要相应map存储部分数据

ioServer.on('connection',socket => {

    socket.on('join restaurant',restaurant => {
        socket.join(restaurant)
    })
    //商户进入对应商家用户

    socket.on('join desk',(info) => {
        if(deskIn.get(info.desk) || deskIn.get(info)){
            if(info.memberCount){
                socket.join(info.desk)
                var cartfood = deskCartMap.get(info.desk)
                var totalPrice = deskTotal.get(info.desk)
                if(!cartfood){
                    deskCartMap.set(info.desk,[])
                    deskTotal.set(info.desk,{total:0})
                } 
            
                socket.emit('cart food',{cartfood,totalPrice} || [])
            } else{
                var memberCount = deskIn.get(info.desk)
                socket.join(info.desk)
                socket.emit('someone in',memberCount)
            }
        } else {
            socket.join(info.desk)
            var cartfood = deskCartMap.get(info.desk)
            var totalPrice = deskTotal.get(info.desk)
            if(!cartfood){
                deskCartMap.set(info.desk,[])
                deskTotal.set(info.desk,{total:0})
            } 
            
            socket.emit('cart food',{cartfood,totalPrice} || [])
        }
    })
    //客户加入，通过map查询到相应餐桌并获取相应桌信息以及如果有客户加入相同桌载入已有菜单

    socket.on('someone in',(info) => {
        deskIn.set(info.desk,info.memberCount)
    })
    
    socket.on('food inc',info => {
        
        var menu = deskCartMap.get(info.deskid)
        var totalPrice = deskTotal.get(info.deskid)
        var idx = menu.findIndex(it => it.name == info.food.name)
        var food = menu[idx]
        if(idx >= 0){
            menu[idx].count++
            totalPrice.total += menu[idx].price
        }else {
            menu.push({name:info.food.name,count:1,price:info.food.price})
            totalPrice.total += info.food.price
        }
        var idx = menu.findIndex(it => it.name == info.food.name)
        var food = menu[idx]
        ioServer.in(info.deskid).emit('food inc',{food,menu})
    })
    socket.on('food dec',info => {
        console.log(Math.random())
        menu = deskCartMap.get(info.deskid)
        var totalPrice = deskTotal.get(info.deskid)
        var idx = menu.findIndex(it => it.name === info.food.name)
        var food = menu[idx]
        if(idx >= 0){
                menu[idx].count--
                totalPrice.total -= menu[idx].price
        }else{
            return
        }
        ioServer.in(info.deskid).emit('food dec',{food,menu})
    })
    //客户修改食物订单时将其获取并放入对应desk的map中
    
    socket.on('order success',did => {
        deskCartMap.clear()
        deskTotal.clear()
        deskIn.clear(did)
        ioServer.in(did).emit('order success')
    })


})

let db
(async function(){
    db = await require('./db')
}())

const app = express.Router()


// /deskinfo?did=8
app.get('/deskinfo',async(req,res,next) => {

    var desk = await db.get(`
    SELECT 
        desks.id as did,
        users.id as uid,
        desks.name,
        users.tittle
    FROM desks JOIN users ON desks.rid=users.id
    WHERE desks.id=?
    `,req.query.did)
    //db.get(查询第一条符合条件的数据)

    res.json(desk)
})// 获取桌面信息如餐厅名称，桌面名称，将会在landing页面请求并展示



app.get('/menu/restaurant/:rid',async (req,res,next) => {
    
    var menu = await db.all(`
        SELECT * FROM foods WHERE rid = ? AND status = 'on'
    `,req.params.rid)
    //db.all(查询所有数据)

    res.json(menu)
})// 返回餐厅菜单


app.post('/restaurant/:rid/desk/:did/order',async(req,res,next) => {
    var rid = req.params.rid
    var did = req.params.did
    var deskName = req.body.deskName
    var totalPrice = req.body.totalPrice
    var memberCount = req.body.memberCount
    var details = req.body.details
    var status = 'pending' // confirmed/completed
    var timestamp = new Date().toISOString()

    await db.run(`
        INSERT INTO orders (rid,did,deskName,totalPrice,memberCount,details,status,timestamp) VALUES (?,?,?,?,?,?,?,?)
    `,rid,did,deskName,totalPrice,memberCount,details,status,timestamp)

    var order = await db.get('SELECT * FROM orders ORDER BY id DESC LIMIT 1')
    order.details = JSON.parse(order.details) //返回的details应该是数组而不是字符串
    
    res.json(order)

    ioServer.emit('new order',order)
})// 用户下单

app.get('/restaurant/:rid/desk/:did/placeorder',async(req,res,next) => {
    var rid = req.params.rid
    var did = req.params.did

    var myorder = await db.get('SELECT * FROM ORDERS WHERE did=? AND rid=?',did,rid)

    res.json(myorder)
})//用户下单后获取订单信息

//订单管理api
app.route('/restaurant/:rid/order')
    .get(async (req,res,next) => {
        console.log(req.cookies)
        orders = await db.all('SELECT * FROM orders WHERE rid = ? ORDER BY timestamp DESC',req.cookies.userid)
        orders.forEach(order => {
            order.details = JSON.parse(order.details)
        })
        res.json(orders)
    })//获取订单并展示
    
app.route('/restaurant/:rid/order/:oid')
    .delete(async (req,res,next) => {
        var rid = req.cookies.userid
        var id = req.params.oid
        order = await db.get('SELECT * FROM orders WHERE rid=? AND id=?',rid,id)
        if(order){
            order = await db.run('DELETE FROM orders WHERE rid=? AND id=?',rid,id)
            delete order.id
        }else{
            res.status(401).json({
                code:-1,
                msg:"不存在或您无权限删除此订单"
            })
        }
    })//删除一个订单
    .put(async (req,res,next) => {
        oid = req.params.oid
        userid = req.cookies.userid 

        var order = await db.get('SELECT * FROM foods WHERE id=? AND rid = ?',oid,userid)

        if(order){
            db.run(`
            UPDATE foods SET name=?,price=?,status=?
            WHERE id=? AND rid=?
            `,req.body.name,req.body.price,req.body.status,oid,userid)
            var food = await db.get('SELECT * FROM foods WHERE id=? AND rid = ?',oid,userid)
            res.json(order)
        } else {
            res.end(401).json({
                code:-1,
                msg:'不存在或您无权限修改此订单'
            })
        }
    })//修改一个订单

app.put('/restaurant/:rid/order/:oid/status',async (req,res,next) =>　{
    await db.run(`
        UPDATE orders SET status = ? WHERE id = ? AND rid = ?
    `,req.body.status,req.params.oid,req.cookies.userid)

    res.json(await db.get('SELECT * FROM orders WHERE id = ?',req.params.oid))
})//更改订单状态

//菜品管理api
//获取所有菜品并展示
app.route('/restaurant/:rid/food')
    .get(async(req,res,next) => {
        var foodList = await db.all('SELECT * FROM foods WHERE rid=?',req.cookies.userid)
        
        console.log(req.cookies.userid)
        console.log(req.params.rid)
        res.json(foodList)
    })//获取菜品
    .post(uploader.single('img'),async(req,res,next) => {
        //single中对应<input type="file" name="img">中的img
        //或者axios中上传的img
        var data = req.body
        await db.run(`
            INSERT INTO foods (rid,name,desc,price,category,status,img) VALUES (?,?,?,?,?,?,?)
        `,req.cookies.userid,data.name,data.desc,data.price,data.category,data.status,req.file.filename)
        
        var food = await db.get('SELECT * FROM foods ORDER BY id DESC LIMIT 1')
        
        res.json(food)
        
    })//增加菜品


app.route('/restaurant/:rid/food/:fid')
    .delete(async(req,res,next) => {
        fid = req.params.fid
        userid = req.cookies.userid

        var food = await db.get('SELECT * FROM foods WHERE id=? AND rid = ?',fid,userid)

        if(food){
            await db.run('DELETE FROM foods WHERE id = ? AND rid = ?',fid,userid)
            delete food.id
            res.json(food)
        } else {
            res.status(401).json({
                code:-1,
                msg:'不存在或您无权限删除此菜品'
            })
        }
    })//删除菜品
    .put(uploader.single('img'),async(req,res,next) => {
        fid = req.params.fid
        userid = req.cookies.userid 

        var food = await db.get('SELECT * FROM foods WHERE id=? AND rid = ?',fid,userid)

        if(food){
            db.run(`
            UPDATE foods SET name=?,desc=?,price=?,category=?,status=?,img=?
            WHERE id=? AND rid=?
            `,req.body.name,req.body.desc,req.body.price,req.body.category,req.body.status,req.file.filename,fid,userid)
            var food = await db.get('SELECT * FROM foods WHERE id=? AND rid = ?',fid,userid)
            res.json(food)
        } else {
            res.end(401).json({
                code:-1,
                msg:'不存在或您无权限修改此菜品'
            })
        }
    })//修改菜品

//桌面管理api
app.route('/restaurant/:rid/desk')
    .get(async(req,res,next) => {
        var deskList = await db.all('SELECT * FROM desks WHERE rid=?',req.cookies.userid)
        res.json(deskList)
    })//获得桌面信息
    .post(async(req,res,next) => {
        await db.run(`
            INSERT INTO desks (rid,name,capacity) VALUES (?,?,?)
        `,req.cookies.userid,req.body.name,req.body.capacity)
        
        var desk = await db.get('SELECT * FROM desks ORDER BY id DESC LIMIT 1')

        res.json(desk)
        
    })//增加一个桌面


app.route('/restaurant/:rid/desk/:did')
    .delete(async(req,res,next) => {
        did = req.params.did
        userid = req.cookies.userid

        var desk = await db.get('SELECT * FROM desks WHERE id=? AND rid = ?',did,userid)

        if(desk){
            await db.run('DELETE FROM desks WHERE id = ? AND rid = ?',did,userid)
            delete desk.id
            res.json(desk)
        } else {
            res.status(401).json({
                code:-1,
                msg:'不存在或您无权限删除此桌面'
            })
        }
    })//删除桌面
    .put(async(req,res,next) => {
        did = req.params.did
        userid = req.cookies.userid 

        var desk = await db.get('SELECT * FROM desks WHERE id=? AND rid = ?',did,userid)

        if(desk){
            db.run(`
            UPDATE desks SET name=?,capacity=?
            WHERE id=? AND rid=?
            `,req.body.name,req.body.capacity,did,userid)
            var desk = await db.get('SELECT * FROM desks WHERE id=? AND rid = ?',did,userid)
            res.json(desk)
        } else {
            res.end(401).json({
                code:-1,
                msg:'不存在或您无权限修改此桌面'
            })
        }
    })//修改桌面


module.exports = app  