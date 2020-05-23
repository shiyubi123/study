import React,{ Component} from 'react'
import {withRouter} from 'react-router-dom'
import './landStyle.css'
import api from './api'
import io from 'socket.io-client'
import './LandingPage.css'

//路由跳转  用withRouter包一次组件，然后组件就有props，而props中通过history来进行跳转

import { Button,  Radio ,PageHeader} from 'antd';
import 'antd/dist/antd.css'


class LandingPage extends Component{
    constructor(props){
        super(props)

        this.state = {
            customs:0,
            dinfo:null
        }

        this.rid = props.match.params.rid
        this.did = props.match.params.did
    }

    componentDidMount(){
        this.socket = io()

        this.socket.on('connect',() => {
            this.socket.emit('join desk',{desk:this.did})
            //加入相应餐桌并告知后端客户加入
        })
        this.socket.on('someone in',(memberCount) => {
            this.props.history.push(`/qrorder/r/${this.rid}/d/${this.did}/c/${memberCount}`)
        })

        
        api.get(`/deskinfo?did=${this.did}`).then(res => {
            console.log(res)
            this.setState({
                dinfo:res.data
            })
        })
    }

    
    confirm = (customs) => {
        this.props.history.push(`/qrorder/r/${this.rid}/d/${this.did}/c/${this.state.customs}`)
    }

    customsChange = e => {
        this.setState({ customs: e.target.value });
    };

    render(){
        return(
                <div>
                    <PageHeader
                        style={{
                            border: '1px solid rgb(235,237,240)',
                            backgroundColor:'rgb(51,136,255)',
                            fontFamily: "Microsoft Yahei"
                        }}
                        title={'尊敬的' + (this.state.dinfo ? this.state.dinfo.tittle + '-' + this.state.dinfo.name : '请等待加载桌面') + '桌顾客，欢迎您！'}
                    />
                    <Radio.Group style={{textAlign:'center', position:"absolute",top:'40%',buttonStyle:'solid'}} value={this.state.customs} onChange={this.customsChange}>
                        <h2>请选择点餐的人数</h2>
                        <Radio.Button value={1}>1</Radio.Button>
                        <Radio.Button value={2}>2</Radio.Button>
                        <Radio.Button value={3}>3</Radio.Button>
                        <Radio.Button value={4}>4</Radio.Button>
                    </Radio.Group>
                    <Button style={{position:"absolute",top:'55%'}} type="primary" onClick={() => {this.confirm(this.state.customs)}} block>确定</Button>
                </div>
        )
    }
}

export default withRouter(LandingPage)