import React,{useRef} from 'react'
import api from './api'
import {withRouter,Link} from 'react-router-dom'
//withrouter包裹的函数可以借由props作为函数的参数，而props中有history进而实现跳转,但这一前提是包裹的是一个函数组件，或者通过react-router-dom中的usehistory。如果仅仅是个事件绑定的函数，则需要依靠Router维持的history

import './loginPage.css'
import { Form, Icon, Input, Button ,Checkbox} from 'antd';
import 'antd/dist/antd.css'
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
//UI

var captchaCode = Date.now()
function Login(props){
    var imgRef = useRef()
    const { getFieldDecorator } = props.form

    async function login(e) {
        e.preventDefault()//阻止表单的正常提交,而走后面的axios
        
        props.form.validateFields(async(err, values) => {
            if (!err) {
                var username = values.username
                var password = values.password
                var captcha = values.captcha
                try{
                    await api.post('/login', {username,password,captcha})
                    props.history.push('/qrorder/manage/order')
                } catch(e) {
                    alert(JSON.stringify(e))
                }
            }
        });
    }

    function anotherCaptcha(){
        console.log(imgRef.current)
        imgRef.current.src = ""
        setTimeout(() => {
                captchaCode = Date.now()
            imgRef.current.src = "/api/captcha?" + captchaCode
        },1)
    }

    
    return (
        <div className='logPage'>
            <div className='logContainer'>
                <h1>商户登录</h1>
                <Form onSubmit={login}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入您的用户名' }],
                        })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                        />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入您的密码' }],
                        })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                        />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('captcha', {
                            rules: [{ required: true, message: '请输入您的验证码' }],
                        })(
                        <Input
                            prefix={<Icon type="check" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="验证码"
                            style={{width:'140px',verticalAlign:'middle',height:'52px'}}
                        />,
                        )}
                        {getFieldDecorator('captcha', {})(
                        <img
                            alt=""
                            onClick={anotherCaptcha} 
                            src={"/api/captcha?" + captchaCode} 
                            ref={imgRef}/>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住我</Checkbox>)}
                        <Link to="/qrorder/register">
                            <a className='register'>用户注册</a>
                        </Link><br/>
                        <Button type="primary" htmlType="submit" className="login-form-button" block>
                            登录
                        </Button>
                    </Form.Item>
                    
                </Form>
            </div>
        </div>
    )
    //验证码不刷新问题:在请求获取验证码的地址后面加一个时间戳
}

export default withRouter(WrappedNormalLoginForm)