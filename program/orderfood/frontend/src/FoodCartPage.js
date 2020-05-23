import React,{useState,useEffect,Component} from 'react'
import api from './api.js'
import Proptypes from 'prop-types'
import './foodCartPage.css'
import io from 'socket.io-client'

import { Icon, Button , Card , Avatar,Drawer,PageHeader} from 'antd';
import 'antd/dist/antd.css'

const { Meta } = Card;

function MenuItem({food,onUpdateInc,onUpdateDec}){
    var amount = food.count
    var [count,setCount] = useState(amount)

    useEffect(() => {
        setCount(amount)
    },[amount])
    

    function inc(){
        setCount(count+1)
        onUpdateInc(food,count+1)
    }
    
    function dec(){
        if(count > 0){
            setCount(count-1)
            onUpdateDec(food,count-1)
        }else{
            return
        }
    }

    MenuItem.propTypes = {
        food:Proptypes.object.isRequired,
        onDec:Proptypes.func,
        onInc:Proptypes.func
    }

    return (
            <div>
                <Card
                    style={{
                    border:'5px solid rgb(235,237,240)',
                    }}
                    actions={[
                    <Button onClick={() => dec()}>
                        <Icon type="minus" />
                    </Button>,
                    <h2>
                        {count ? count : 0}
                    </h2>,
                    <Button onClick={() => inc()}>
                        <Icon type="plus" />
                    </Button>,
                ]}
                >
                    <Meta
                        style=
                        {{
                            pointerEvents:'none'
                        }}
                        avatar={<Avatar shape="square" size={110} src={'/upload/' + food.img} />}
                        title={"名称:"+food.name}
                        description={
                            <div>
                                {
                                    <div>
                                        <div>描述:  {food.desc}</div>
                                        <div>价格:  {food.price}</div>
                                    </div>
                                }
                            </div>
                        }
                    />
                </Card>
            </div>
        )
}

function ShopcartEX({details}){
    return(
        <div className='shopCartEX' style={{position:"absolute",top:'55px',width:'100%',maxWidth:'90%',}}>
            {
                details.map(foodinfo => {
                    if(foodinfo.count !== 0){
                        return(
                            <div style={{boxSizing:'border-box', maxWidth:'100%', margin:'5px'}}>
                                <div style={{float:'left',width:'50%',}}>名称:{foodinfo.name}</div>
                                <div style={{float:'right',marginLeft:'20px'}}>
                                    价格：{foodinfo.count * foodinfo.price}
                                </div>
                                <div style={{float:'right',}}>数量：{foodinfo.count}</div>
                            </div>
                        )
                    }else{
                        return
                    }
                })
            }
        </div>
    )
}

function Shopcart({total,details,placeOrder}){
    var [visible,setvisible] = useState(false)

    function showDrawer () {
        setvisible(true)
    };

    function onClose () {
        setvisible(false)
    };

    function orderPlace(){
        onClose()
        placeOrder()
    }
    
    return(
        <div>
            <Drawer
                title="购物车"
                placement='bottom'
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <ShopcartEX details={details}/>
                <div
                    style={{
                        position: 'absolute',
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
                    <Button
                        style={{
                            marginRight: 8,
                        }}
                        onClick={onClose}
                    >
                        收起
                    </Button>
                    <Button onClick={orderPlace} type="primary">
                        下单
                    </Button>
                </div>
            </Drawer>
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
                <Button type="primary" onClick={showDrawer} style={{float:'left'}} disabled={total>0?false:true}>
                    <Icon type="shopping-cart" />
                    购物车
                </Button>
                <Button type="primary" style={{float:'right', marginLeft:'10px'}} onClick={placeOrder}>下单</Button>
                <div style={{float:'right',lineHeight:'30px'}}>
                    总价:{total}
                </div>
            </div>
        </div>
    )
}

export default class FoodCart extends Component{
    constructor(props){
        super(props)

        this.state = {
            deskinfo:null,
            foods:[],
            order:{
                deskName:null,
                totalPrice:0,
                memberCount:this.memberCount,
                details:[],
            },
        }

        this.memberCount = this.props.match.params.count
        this.did = this.props.match.params.did
        this.rid = this.props.match.params.rid
        this.history = this.props.history
    }

    componentDidMount(){
        api.get(`/deskinfo?did=${this.did}`).then(res => {
            this.setState({
                deskinfo:res.data,
                order:{
                    deskName:res.data.name,
                    totalPrice:0,
                    memberCount:this.memberCount,
                    details:[],
                }
            })
        })

        api.get('/menu/restaurant/1').then(res => {
            this.setState({
                foods:res.data
            })
        })

        this.socket = io()
        
        this.socket.on('connect',() => {
            this.socket.emit('join desk',{memberCount:this.memberCount,desk:this.did})
            this.socket.emit('someone in',{memberCount:this.memberCount,desk:this.did})
            //加入相应餐桌并告知后端客户加入
        })
        //连接成功后执行内部代码
        //注：socketio前几次通信可能走ajax，所以可能看不到相应ws包

        this.socket.on('cart food',info => {
            var foods = this.state.foods
            var cart = info.cartfood;
            (function merge(foods,cart){
                for(var idx in cart){
                    // eslint-disable-next-line
                    var index = foods.findIndex(it => it.name === cart[idx].name)
                    foods[index].count = cart[idx].count
                }
            })(foods,cart)

            if(info.totalPrice){
                this.setState({
                    foods:foods,
                    order:{
                        ...this.state.order,
                        details:info.cartfood,
                        totalPrice:info.totalPrice.total
                    }
                })
            }
            console.log(this.state)
        })
        //后端发回此桌面已经点了的菜单

        this.socket.on('food inc',info => {
            this.onInc(info.food,info.menu)
        })
        this.socket.on('food dec',info => {
            this.onDec(info.food,info.menu)
        })        
        //实时获取点单并触发相应变化
        
        this.socket.on('order success',() => {
            this.props.history.push(`/qrorder/r/${this.rid}/d/${this.did}/placeorder`)
        })
    }

    foodInc = (food,count) => {
        var deskid = this.did
        this.socket.emit('food inc',{food,count,deskid})
    }
    foodDec = (food,count) => {
        var deskid = this.did
        this.socket.emit('food dec',{food,count,deskid})
    }
    //传入下层组件，在下层组件点击后主动触发

    onInc = (food,menu) => {
        var idx = this.state.foods.findIndex(it => it.name === food.name)
        if(idx >= 0){
            var count = menu[idx].count
            // eslint-disable-next-line
            this.state.foods[idx].count = count
        }else{
            this.state.foods.push(food)
        }

        this.setState({
            foods:this.state.foods,
            order:{
                ...this.state.order,
                totalPrice:this.state.order.totalPrice+food.price,
                details:menu
            }
        })
        console.log(this.state.foods)
    }

    onDec = (food,menu) => {
        var idx = this.state.foods.findIndex(it => it.name === food.name)
        if(idx >= 0){
            
            if(menu[idx]){
                var count = menu[idx].count
                // eslint-disable-next-line
                this.state.foods[idx].count = count
            }else{
                // eslint-disable-next-line
                this.state.foods[idx].count = 0
            }
            
        }else{
            return
        }

        this.setState({
            ...this.state,
            order:{
                ...this.state.order,
                totalPrice:this.state.order.totalPrice-food.price,
                details:menu
            }
        })
    }
    //收到变化传来的参数并改变内容

    placeOrder = () => {
        var placeorder = {
            ...this.state.order,
            details:JSON.stringify(this.state.order.details)
        }
        api.post(`/restaurant/${this.rid}/desk/${this.did}/order`,placeorder)
        this.props.history.push(`/r/${this.rid}/d/${this.did}/placeorder`)
        this.socket.emit('order success',this.did)
    }


    render(){
        return (
            <div> 
                <PageHeader
                    style={{
                        border: '1px solid rgb(235,237,240)',
                        backgroundColor:'rgb(51,136,255)',
                        fontFamily: "Microsoft Yahei"
                    }}
                    title='菜单界面'
                />
                {
                    this.state.foods.map(food => {
                        return <MenuItem key={food.name} food={food} onUpdateInc={this.foodInc} onUpdateDec={this.foodDec} />
                    })
                }
                <Shopcart total={this.state.order.totalPrice} details={this.state.order.details} placeOrder={this.placeOrder}/>
            </div>
        )
    }
}

//显示已经选择的菜品以及数量，总价与清除功能

// export default withRouter(function (props){
//     return(
//         <div>
//             <Suspense fallback={<div>loading...</div>}>
//                 <Foodcart upProps={props}/>
//             </Suspense>
//         </div>
//     )
// })