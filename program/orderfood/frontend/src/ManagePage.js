import React, {useEffect, useState} from 'react'
import {Switch,Link,Route,withRouter,useHistory} from 'react-router-dom'
import OrderManage from './OrderManage.js'
import DeskManage from './DeskManage.js'
import FoodManage from './FoodManage.js'
import SettingManage from './SettingManage.js'
import api from './api.js'


import './managePage.css'
import { Form, Icon, Menu ,PageHeader} from 'antd';
import 'antd/dist/antd.css'
const WrappedManage = Form.create({ name: 'manage' })(Manage);


function Manage(props){
    var history = useHistory()
    var [current,setcurrent] = useState('orderManage')
    var [info,setInfo] = useState(null)

    
    useEffect(() => {
        (async () => {
            try{
                let response = await api.get('/userinfo')
                setInfo(response.data)
            } catch(e){
                history.push('/qrorder')
                //由Router维护的history，也可以window.history.hash='/',但不够规范
            }
        })()
    // eslint-disable-next-line
    },[])

    function handleClick(e){
        setcurrent(e.key)
    };
    return(
        <div className='manageContainer'>
            <PageHeader
                style={{
                    border: '1px solid rgb(235,237,240)',
                    backgroundColor:'rgb(51,136,255)',
                    fontFamily: "Microsoft Yahei"
                }}
                onBack={async() => {
                    await api.get('/logout')
                    props.history.push('/') 
                }}
                title={info ? '欢迎:'+info.tittle : 'loading'}
            />
            <Menu style={{border:'1px solid rgb(235,237,240)'}} onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item style={{paddingLeft:'10px',paddingRight:'10px'}} key="orderManage">
                    <Icon style={{margin:'5px'}} type="profile" />
                    <Link style={{float:'right'}} to='/qrorder/manage/order'>
                        订单管理
                    </Link>
                </Menu.Item>
                <Menu.Item style={{paddingLeft:'10px',paddingRight:'10px'}} key="foodManage">
                    <Icon style={{margin:'5px'}} type="appstore" />
                    <Link style={{float:'right'}} to='/qrorder/manage/food'>
                        菜品管理
                    </Link>
                </Menu.Item>
                <Menu.Item style={{paddingLeft:'10px',paddingRight:'10px'}} key="deskManage">
                    <Icon style={{margin:'5px'}} type="appstore" />
                    <Link style={{float:'right'}} to='/qrorder/manage/desk'>
                        桌面管理
                    </Link>
                </Menu.Item>
                <Menu.Item style={{paddingLeft:'10px',paddingRight:'10px'}} key="settingManage">
                    <Icon style={{margin:'5px'}} type="profile" />
                    <Link style={{float:'right'}} to='/qrorder/manage/setting'>
                        设置
                    </Link>
                </Menu.Item>
            </Menu>
            <main style={{boxSizing: 'border-box',border:'1px solid rgb(235,237,240)'}}>
                <Switch>
                    <Route path='/qrorder/manage/order' component={OrderManage}/>
                    <Route path='/qrorder/manage/desk' component={DeskManage}/>
                    <Route path='/qrorder/manage/food' component={FoodManage}/>
                    <Route path='/qrorder/manage/setting' component={SettingManage}/>
                </Switch>
            </main>
        </div>
    )
}

export default withRouter(WrappedManage)