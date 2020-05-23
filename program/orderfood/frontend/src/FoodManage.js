import React,{useState,useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import api from './api'

import './foodManage.css'
import { Icon,Input, Button ,Card ,  Avatar, Form} from 'antd';
import 'antd/dist/antd.css'
const { Meta } = Card;
const WrappedFoodManage = Form.create({ name: 'FoodManage' })(FoodManage);
const WrappedFoodItem = Form.create({ name: 'FoodItem' })(FoodItem);


function FoodItem({food,upProps}){
    var [foodInfo,setfoodInfo] = useState(food)
    //为了将修改后put到后端返回的结果再重新更新到页面中，需要用这个
    var [isModify,setisModify] = useState(false)
    //用于切换修改与非修改时候food的状态
    var [foodprops,setfoodprops] = useState({
        name:food.name,
        desc:food.desc,
        price:food.price,
        category:food.category,
        status:food.status,
        img:null,
    })
    //用于获取修改时food的各个信息以及实时更新，并在确认修改后将信息传给后端

    
    function modify(isModify){
        if(isModify === false){
            setisModify(true)
        } else {
            setisModify(false)
        }
    }

    function change(e){
        setfoodprops({
            ...foodprops,
            [e.target.name]:e.target.value
        })
    }
    function imgChange(e){
        setfoodprops({
            ...foodprops,
            img:e.target.files[0],
        })
    }

    function confirmModify(){
        var fd = new FormData()

        for(var key in foodprops){
            var val = foodprops[key]
            fd.append(key,val)
        }

        api.put('/restaurant/1/food/' +　food.id,fd).then((foodinfo) => {
            setisModify(false)
            setfoodInfo(foodinfo.data)
        })
    }
    //写到此时，如何获取rid是个问题，因为我们在这个组件中既没有从上级得到相关数据，而网址中也不含有相关信息，所以办法一个是上层组件传入餐厅信息，第二个是在网址中获取

    function deleteFood(props){
        api.delete('/restaurant/1/food/' + food.id).then(() => {
            props.history.go(0)
        })    
    }

    function changeStatus(foodprops){
        if(foodprops.status === 'on'){
            setfoodprops({
                ...foodprops,
                status:'off',
            })
        } else {
            setfoodprops({
                ...foodprops,
                status:'on',
            })
        }
        
        api.put('/restaurant/1/food/' +　food.id,foodprops)
    }

    return (
        <div>
            {
                !isModify 
                ? 
                <Card
                    actions={[
                        <Button onClick={() => {modify(isModify)}}>
                            <Icon type="printer" />
                            修改
                        </Button>,
                        <Button onClick={()=> changeStatus(foodprops)}>
                            <Icon type="check-circle" />
                            {foodprops.status === 'on' ? '上架' : '下架'}
                        </Button>,
                        <Button onClick={() => deleteFood(upProps)}>
                            <Icon type="file-done" />
                            删除
                        </Button>,
                    ]}
                >
                    <Meta
                        avatar={<Avatar shape="square" size={110} src={"/upload/"+foodInfo.img}/>}
                        title={foodInfo.name}
                        description={
                            <div>
                                <div>描述：{foodInfo.desc ? foodInfo.desc : '暂无描述'}</div>
                                <div>价格：{foodInfo.price}</div>
                                <div>分类：{foodInfo.category ? foodInfo.category : '暂未分类'}</div>
                            </div>
                        }
                    />
                </Card>
                :
                <div>
                    <div>
                        <form>
                            <Input 
                                type="text" 
                                onChange={change} 
                                defaultValue={foodInfo.name} 
                                name="name"
                                addonBefore="名称"
                            ></Input>
                            <Input 
                                type="text" 
                                onChange={change} 
                                defaultValue={foodInfo.desc} 
                                name="desc"
                                addonBefore="描述"
                            ></Input>
                            
                            <Input 
                                type="text" 
                                onChange={change} 
                                defaultValue={foodInfo.price} 
                                name="price"
                                addonBefore="价格"
                            ></Input>
                            <Input 
                                type="text" 
                                onChange={change} 
                                defaultValue={foodInfo.category} 
                                name="category"
                                addonBefore="分类"
                            ></Input>
                            <Input 
                                type="file" 
                                onChange={imgChange} 
                                name="img"
                                addonBefore="图片"
                            ></Input>
                        </form>
                    </div>
                    <div>
                        <Button onClick={() => confirmModify()}>确认</Button>
                        <Button onClick={() => {modify(isModify)}}>返回</Button>
                        <Button onClick={()=> changeStatus(foodprops)}>
                            <Icon type="check-circle" />
                            {foodprops.status === 'on' ? '上架' : '下架'}
                        </Button>
                    </div>
                </div>
                    //如何将修改form中的新数据获取并传出，第一种通过绑上4个ref(有点麻烦),第二种通过usestate
            }
            
        </div>
    )
}

function FoodOptions (props){
    
    var [isAddfood,setIsAddfood] = useState(false)
    var [addfoodprops,setaddfoodprops] = useState({
        name:null,
        desc:null,
        price:null,
        category:null,
        status:'on',
        img:null,
    })

    function IsaddFood(){
        if (isAddfood === false){
            setIsAddfood(true)
        } else {
            setIsAddfood(false)
        }
    }

    function add(e){
        setaddfoodprops({
            ...addfoodprops,
            [e.target.name]:e.target.value,
        })
    }
    function addimg(e){
        setaddfoodprops({
            ...addfoodprops,
            img:e.target.files[0],
        })
    }

    function confirmFood(props){
        var fd = new FormData()
        
        for(var key in addfoodprops){
            var val = addfoodprops[key]
            fd.append(key,val)
        }

        api.post('/restaurant/1/food',fd).then(() => {
            props.history.go(0)
        })
    }

    return(
        <div>
            {
                !isAddfood 
                ? 
                <div>
                    <Button 
                        onClick={IsaddFood}
                        type="primary "
                        block
                    >
                        添加菜品
                    </Button>
                </div>
                :
                <div>
                    <div>
                        <form>
                            <Input 
                                type="text" 
                                onChange={add}  
                                name="name"
                                addonBefore="名称"
                            ></Input>
                            <Input 
                                type="text" 
                                onChange={add}  
                                name="desc"
                                addonBefore="描述"
                            ></Input>
                            <Input 
                                type="text" 
                                onChange={add}  
                                name="price"
                                addonBefore="价格"
                            ></Input>
                            <Input 
                                type="file" 
                                onChange={addimg}  
                                name="img"
                                addonBefore="图片"
                            ></Input>
                            <Input 
                                type="text" 
                                onChange={add}  
                                name="category"
                                addonBefore="分类"
                            ></Input>
                        </form>
                    </div>
                    <div>
                        <Button onClick={() => confirmFood(props.upProps)}>确认</Button>
                        <Button onClick={() => IsaddFood(isAddfood)}>返回</Button>
                    </div>
                </div>
            } 
        </div>
        //如何将修改form中的新数据获取并传出，第一种通过绑上4个ref(有点麻烦),第二种通过usestate
    )
}

function FoodManage (props){
    var [foods,setFoods] = useState([])
    const { getFieldDecorator } = props.form

    useEffect(() => {
        api.get('restaurant/1/food').then(res => {
            setFoods(res.data)
        })
    },[])

    return (
        <div>
            <FoodOptions upProps={props}/>
            <div>
                {
                    foods.map(food => {
                        return <FoodItem key={food.id} food={food} upProps={props}/>
                    })
                }
            </div>
        </div>
    )
}

export default withRouter(WrappedFoodManage)