import React,{useState,useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import api from './api'


import { Button, PageHeader} from 'antd';
import 'antd/dist/antd.css'

export default withRouter(function (props){
    var [myorder,setmyorder] = useState({})
    var params = props.match.params
    var rid = params.rid
    var did = params.did

    
    useEffect(() => {
        (async() => {
            var res = await api.get(`/restaurant/${rid}/desk/${did}/placeorder`)
            setmyorder(res)
        })()
    // eslint-disable-next-line    
    },[])
    //不能直接set order为res.data,res在定义后在加载之前是空，所以此时直接用res.data会得到undefined
    



    if(myorder.data){
        var details = JSON.parse(myorder.data.details)
        var total = myorder.data.totalPrice

        return(
            <div>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235,237,240)',
                        backgroundColor:'rgb(51,136,255)',
                        fontFamily: "Microsoft Yahei"
                    }}
                    title='下单成功！'
                />
                {
                    details.map(food => {
                        if(food.count !== 0){
                            return(
                                <div style={{boxSizing:'border-box', borderBottom:'1px solid black',overflow:'hidden', maxWidth:'100%', margin:'5px'}}>
                                    <div style={{float:'left',width:'50%',}}>名称:{food.name}</div>
                                    <div style={{float:'right',marginLeft:'20px'}}>
                                        价格：{food.count * food.price}
                                    </div>
                                    <div style={{float:'right',}}>数量：{food.count}</div>
                                </div>
                            )
                        }else{
                            return
                        }
                    })
                }
                <div 
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                    }}
                >
                    <Button type="primary" style={{float:'right', marginLeft:'10px'}}>
                        <a href="http://47.102.207.48/#/qrorder/landing/r/1/d/1">再来一单</a>
                    </Button>
                    <div style={{float:'right',lineHeight:'30px'}}>
                        总价:{total}
                    </div>
                </div>
            </div>
        )
    }else {
        return <div>loading...</div>
    }


    // var [myorder,setmyorder] = useState({})

    // useEffect(() => {
    //     api.get(`/restaurant/${rid}/desk/${did}/placeorder`).then(res => {
    //         console.log(res)
    //         setmyorder(res.data)
    //     })
    // // eslint-disable-next-line
    // },[])
    // 为什么会报错，只能读取res，res.data
    
})
