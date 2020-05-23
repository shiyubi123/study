import React from 'react'
import {withRouter} from 'react-router-dom'
import api from './api.js';

import './registerPage.css'
import { Form,Input, Button } from 'antd';
import 'antd/dist/antd.css'
const WrappedRegister = Form.create({ name: 'normal_register' })(Register);


function Register(props){
    
    const { getFieldDecorator } = props.form;

    async function register(e){
        e.preventDefault()

        props.form.validateFields(async(err, values) => {
            if (!err) {
                var username = values.username
                var password = values.password
                var email = values.email
                var tittle = values.tittle
                try{
                    await api.post('/register', {username,password,email,tittle})
                    props.history.push('/qrorder/login')
                } catch(e) {
                    alert(e.response.data.msg)
                }
            }
        });
    }

    function goback(e){
        e.preventDefault()
        props.history.go(-1)
        return false
    }

    return(
        <div className='registerContainer'>
            <h1>注册界面</h1>
            <Form onSubmit={register}>
                <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名' }],
                        })(
                        <Input
                            placeholder="用户名注册"
                        />,
                        )}
                </Form.Item>
                <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入您的密码' }],
                        })(
                        <Input.Password
                            type="password"
                            placeholder="密码设置"
                        />,
                        )}
                </Form.Item>
                <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: '请输入邮箱地址' }],
                        })(
                        <Input
                            placeholder="邮箱地址注册"
                        />,
                        )}
                </Form.Item>
                <Form.Item>
                        {getFieldDecorator('tittle', {
                            rules: [{ required: true, message: '请输入店名' }],
                        })(
                        <Input
                            placeholder="店名注册"
                        />,
                        )}
                </Form.Item>
                <Button htmlType="submit">
                    注册
                </Button>
                <Button onClick={(e)=>{goback(e)}} style={{float:'right'}}>返回</Button>
            </Form>
        </div>
    )
}

export default withRouter(WrappedRegister)