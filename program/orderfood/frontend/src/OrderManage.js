import React,{useState,Component} from 'react'
import io from 'socket.io-client'
import api from './api.js'
import produce from 'immer'
//这个页面进入后就需要跟服务器建立相关的连接·
//socket io 有两个包，一个是在后端用的(socket.io)，这个是前端用的(socket.io-client)

import './orderManage.css'
import { Form, Icon, Button ,Spin, Card , Collapse} from 'antd';
import 'antd/dist/antd.css'

const { Meta } = Card;
const { Panel } = Collapse;

function OrderItem({order,onDelete}){
    var [orderInfo,setorder] = useState(order)
    
    function confirmOrder(){
        api.put(`restaurant/1/order/${order.id}/status`,{
            status:'confirmed'
        }).then(() => {
            setorder({
                ...orderInfo,
                status:'confirmed'
            })
        })
    }

    function completeOrder(){
        api.put(`restaurant/1/order/${order.id}/status`,{
            status:'completed'
        }).then(() => {
            setorder({
                ...orderInfo,
                status:'completed'
            })
        })
    }

    async function deleteOrder(){
        api.delete('restaurant/1/order/' + order.id)
        onDelete(order)
    }

    function statusToCN(status){
        if(status === 'pending'){
            return '  等待订单确认中'
        } else if(status === 'confirmed'){
            return '  已确认'
        } else {
            return '  已完成'
        }
    }

    return(
        <div>
            <Card
                style={{
                    border:'5px solid rgb(235,237,240)',
                }}
                actions={[
                    <Button>
                        <Icon type="printer" />
                        打印
                    </Button>,
                    <Button onClick={confirmOrder}>
                        <Icon type="check-circle" />
                        确认
                    </Button>,
                    <Button onClick={completeOrder}>
                        <Icon type="file-done" />
                        完成
                    </Button>,
                    <Button onClick={deleteOrder}>
                        <Icon type="close-circle" />
                        取消
                    </Button>,
                ]}
            >
                <Meta
                    style=
                    {{
                        pointerEvents:'none'
                    }}
                    title={"桌号:"+orderInfo.deskName}
                    description={
                        <div>
                            {
                                '总价格:'+orderInfo.totalPrice+
                                '    人数:'+orderInfo.memberCount+
                                '    订单状态:'+statusToCN(orderInfo.status)
                            }
                            <Collapse>
                                <Panel 
                                    header="订单详情" 
                                    key="1"
                                    style={{
                                        pointerEvents: 'initial',
                                        marginBottom:'10px',
                                    }}
                                >
                                    <div>{
                                        orderInfo.details.map(it => {
                                            return <div style={{position:'relative'}} key={it.name}>
                                                <div style={{float:'right'}}>{'数量:'+it.count}</div><div style={{width:'100px',position:'absolut',right:'0px'}}>{'菜品:'+it.name}</div>
                                            </div>
                                        })
                                    }</div>
                                </Panel>
                            </Collapse>
                        </div>
                    }
                    
                />
            </Card>
        </div>
    )
}

export default class OrderManage extends Component{
    // useEffect(() => {
    //     var socket = io()
        
    //     socket.on('new order',order => {
    //         setorders({
    //             ...orders,
    //             order,
    //         })
    //     })

    //     return() => {socket.close()} 
    //     //当界面被切走的时候应该取消掉这个订单
    // },[])
    //socketio只要一次连上就好了，所以只要运行一次不应该被重复运行，要放到useEffect内。第二个参数为空数组时表示只运行一次，[]中如果有变量，则每次运行useEffect会加载最近的一次该变量值。
    //为什么不好用useEffect，因为这样每次更新io创建又取消，而真正实现较为复杂，所以用class组件使用hooks函数更为方便

    constructor(props){
        super(props)

        this.state = {
            orders:[]
        }

    }

    componentDidMount(){
        this.socket = io()

        this.socket.on('new order',order => {
            this.setState(state => ({
                orders:[order,...this.state.orders]
            }))
        })


        //前端socketio开启使用

        api.get('/restaurant/1/order').then(res => {
            this.setState({
                orders:res.data
            })
        })
    }
    //react 常用hooks，

    onDelete = (order) => {
        var idx = this.state.orders.findIndex(it => (it.id === order.id))

        this.setState(produce(state =>{
            state.orders.splice(idx,1)
        }))
    }

    render(){
        return (
            <div>
                <div>
                    {this.state.orders.length > 0 ?
                        this.state.orders.map(order => {
                        return <OrderItem  key={order.id} order={order} onDelete={this.onDelete} />
                    })
                    :
                    <Spin />
                    }
                </div>
            </div>
        )
    }
}

const WrappedManage = Form.create({ name: 'orderManage' })(OrderManage);