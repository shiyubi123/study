const express = require('express')
const bodyParser = require('body-parser')
const {Users,Topics} = require('../database/database.js')

const router = express.Router()

let jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/',urlencodedParser,async function(req,res){
    const username = req.body.username
    const password = req.body.password
    await Users.findOne({username:username},function(err,docs){ 
        if(docs){
            if(password === docs.password){
                return res.json({
                    success:true,
                    data:{
                        errorCode:0,
                        userInfo:{
                            username,
                            nickname:docs.nickname
                        }
                    }
                })
            }
        }
        return res.json({
            success:true,
            data:{
                errorCode:1,
            }
        })
    })
})

router.post('/home/invoke-vote',urlencodedParser,async function(req,res){
    const topictittle = req.body.topictittle
    const chooses = req.body.choose.map((item,idx) => {
        return item = {voteName:item}
    })
    new Topics({
        topictittle:topictittle,
        chooses:chooses,
    }).save(function(err,users){
      if(err){
        return res.json({
            success:true,
            data:{
                errorCode:1,
            }
        })
      } else {
        return res.json({
            success:true,
            data:{
                errorCode:0,
            }
        })
      }
    })
})

router.get('/home/topics',urlencodedParser,function(req,res){
    Topics.find(function(err,docs){
        res.json(docs)
    })
})

router.post('/home/topics/delete',urlencodedParser,async function(req,res){
    console.log(req.body)
    await Topics.findOne({topictittle:req.body.topictittle},function(err,docs){
        docs.remove()
    })
    Topics.find(function(err,docs){
        res.json(docs)
    })
})

// router.post('/home/topic/vote',urlencodedParser,async function(req,res){
//     await Topics.findOne({topictittle:req.body.tittle},function(err,docs){
//         const chooses = docs.chooses.forEach(item => {
//             if(item.voteName === req.body.choose){
//                 item.voteNumber += 1
//             }
//         });
//         docs.update({chooses:chooses})
//         docs.save(function(err,docs){
//             if(err){
//                 return res.json({
//                     success:true,
//                     data:{
//                         errorCode:1,
//                     }
//                 })
//             } else {
//                 return res.json({
//                     success:true,
//                     data:{
//                         errorCode:0,
//                         vote:docs
//                     }
//                 })
//             }
//         })
//     })
// })

module.exports = router