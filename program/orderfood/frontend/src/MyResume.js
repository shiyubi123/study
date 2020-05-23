import React from 'react'
import {Link} from 'react-router-dom'

export default function(){
    return(
        <div style={{margin:'auto',width:'800px'}}>
            <h1 style={{textAlign:'center'}}>个人简历</h1>
            <h2>个人介绍</h2>
            <hr/>
            <ul>
                <li>姓名:刘子阳 性别:男 年龄:23岁</li>
                <li>学历:本科</li>
                <li>学校:湖南科技大学(2014.09-2018.07)</li>
                <li>邮箱:470947999@qq.com</li>
                <li>手机:13762219636</li>
                <li>自我评价:热爱互联网行业，有上进心，责任心和良好的团队合作精神。能够保持很高的工作热情与状态。</li>
            </ul>
            <h2>个人技能</h2>
            <hr/>
            <h3>CSS/HTML</h3>
            <ul>
                <li>熟悉HTML各个标签与属性，HTML语义化</li>
                <li>熟练掌握CSS盒模型行内以及块级格式化</li>
                <li>通读《the book of CSS3》，《CSS权威指南》</li>
            </ul>
            <hr/>
            <h3>JavaScript</h3>
            <ul>
                <li>熟悉原生JS，深入理解原型，高阶，闭包，异步，熟悉ES6如Class，Generator，Promise等新特性</li>
                <li>熟悉DOM，BOM等浏览器API，熟悉jQuery</li>
                <li>自学期间，LeetCode刷题过200，实现Lodash函数100左右</li>
                <li>熟悉Node.js，熟悉npm，熟悉Express，了解其中间件机制</li>
                <li>通读《Eloquent JavaScript》，《JavaScript 权威指南》</li>
            </ul>
            <hr/>
            <h3>前端工程化</h3>
            <ul>
                <li>能够熟练使用DevTools进行开发和调试</li>
                <li>熟悉React的使用，React生命周期，熟练使用React函数组件与Class组件</li>
                <li>了解Vue的使用</li>
            </ul>
            <hr/>
            <h3>计算机基础</h3>
            <ul>
                <li>熟悉常用的数据结构（数组，链表，树，堆...）</li>
                <li>理解计算机网络的基本原理与分层模型</li>
                <li>熟悉HTTP协议机制，常用的首部以及缓存方式</li>
                <li>了解数据库及SQL语言的使用</li>
            </ul>
            <hr/>
            <h3>个人项目</h3>
            <ul>
                <li>
                    用纯CSS实现了
                    <a href="/others/mi/index.html">小米首页</a>
                    的静态页面，还有一些小样式如指针抖动的
                    <a href="/others/clock.html">时钟</a>
                    ，以及
                    <a href="/others/slider.html">Slider</a>
                </li>
                <li>使用React实现了扫码点餐:
                    <ul>
                        <li>使用工具:
                            <ul>
                                <li>前端:React,axios,socket.io-client,Ant Design</li>
                                <li>后端:SQlite,Express,socket.io</li>
                            </ul>
                        </li>
                        <li>主要功能:
                            <ul>
                                <li>实现了订单的实时更新功能，用户的实时同步点餐功能以及商户的登录与注册，验证码功能，图像上传功能等。</li>
                            </ul>
                        </li>
                        <li>链接:
                            <ul>
                                <li>
                                    <Link to="/qrorder/landing/r/1/d/1">
                                        客户端
                                    </Link>(建议手机扫二维码浏览)
                                </li>
                                <li>
                                    客户端二维码<br/>
                                    <img style={{width:'200px',height:'200px'}} src="/others/qrcode.png"></img>
                                </li>
                                <li>
                                    <Link to="/qrorder">
                                        商户端
                                    </Link>(用户名a，密码a,建议手机浏览)
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}