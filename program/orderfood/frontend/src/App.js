import React from 'react';
import './App.css';
import {HashRouter,Route , Switch} from 'react-router-dom'
import LandingPage from './LandingPage.js'
import FoodCartPage from './FoodCartPage.js'
import PlaceOrderPage from './PlaceOrderPage.js'
import ManagePage from './ManagePage.js'
import LoginPage from './LoginPage.js'
import RegisterPage from './RegisterPage.js'
import history from './history.js'

import MyResume from './MyResume.js'

// const userAccountMiddleware = require('./user-acount') // 后端客户处理
// const restaurantMiddleWare = require('./restaurant') // 后端商户处理
//什么时候用require，什么情况用import


// app.use(async (req,res,next) => {

// })

// 用户侧
// /landing/restautant/1/desk/1 扫码进入页面 选择人数
// /restautant/1/desk/1 点餐页面


// 商户侧
// 登录
// 后台管理 /manage
  //订单管理 /order
  //桌面管理 /desk
  //菜品管理 /food
  

function App() {
  return (
    <HashRouter>
      <Switch history={history}>
      
        <Route path='/' exact component={MyResume}></Route>
        
        <Route path='/qrorder' exact component={LoginPage}></Route>
        
        <Route path='/qrorder/landing/r/:rid/d/:did' component={LandingPage}></Route>
        <Route path='/qrorder/r/:rid/d/:did/c/:count' component={FoodCartPage}></Route>
        <Route path='/qrorder/r/:rid/d/:did/placeorder' component={PlaceOrderPage}></Route>
        
        <Route path='/qrorder/manage' component={ManagePage}></Route>
        <Route path='/qrorder/login' component={LoginPage}></Route>
        <Route path='/qrorder/register' component={RegisterPage}></Route>
      </Switch>
    </HashRouter>
    //route path = '/'不加exact，'/'路径将能够满足任何访问路径，所以任何访问路径都会指向它
  );
}

export default App;
