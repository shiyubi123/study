import React,{useState} from 'react'
import {withRouter} from 'react-router-dom'
import './foodcart.css'
import api from './api'

export default withRouter(function Foodcart(props){
    var [cartClass,setCartClass] = useState('hidden')
    var [totallPrice,setTotalPrice] = useState(props.totallPrice)

    function changeState(){
        if(cartClass === 'hidden'){
            setCartClass('expand')
        }else{
            setCartClass('hidden')
        }
    }

    function placeOrder(){
        api.post(`/restaurant/${props.match.params.rid}/desk/${props.match.params.did}/order`)
        props.history.goBack()
    }

    return (
        <div className={'foodcart ' + cartClass} >
            <button onClick={() => changeState()}>{cartClass === 'hidden' ? '展开' : '收起'}</button>
            <span>总价：{totallPrice || '0'}</span>
            <button onClick={() => placeOrder()}>下单</button>
        </div>
    )
})