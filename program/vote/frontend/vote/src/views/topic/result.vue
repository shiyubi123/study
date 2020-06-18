<template>
    <section class="topic-vote">
        <div class="radio list-group-item vote-topic-item" v-for="choose in chooses" :key="choose.voteName">
            <h4>
                {{choose.voteName}}
            </h4>
            <div class="vote-number">
                票数:{{choose.voteNumber}}
            </div>
        </div>
        <div id="main" style="width: 600px;height:400px;"></div>
        <button class="btn btn-info" @click="goback">返回话题页</button>
    </section>
</template>

<script>
import echarts from '@/../public/echarts.min.js'

export default {
    data(){
        return{
            chooses:null,
        }
    },
    mounted(){
        // this.getChooses()
        // this.initEcharts()
        
        //接收服务端的信息
        console.log(this.sockets)
        this.sockets.listener.subscribe('result', (data) => {
            this.chooses = data.msg;
            this.initEcharts()
        });
    },
    methods:{
        goback(){
            this.$router.go(-3)
        },
        getChooses(){
            this.chooses = this.$route.query.chooses
        },
        initEcharts(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));

            // 指定图表的配置项和数据
            const Xdata = this.chooses.reduce((pre,cur)=>{
                pre.push(cur.voteName)
                return pre 
            },[])
            const Ydata = this.chooses.reduce((pre,cur)=>{
                pre.push(cur.voteNumber)
                return pre
            },[])
            var option = {
                title: {
                    text: '投票结果图'
                },
                tooltip: {},
                legend: {
                    data:['投票数']
                },
                xAxis: {
                    data: Xdata
                },
                yAxis: {},
                series: [{
                    name: '投票数',
                    type: 'bar',
                    data: Ydata
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    },
    sockets:{
        connect: function() {
        //与socket.io连接后回调
            console.log("socket connected");
        },
        result: function(data){
            console.log(data)
        }
    }
}
</script>

<style lang="scss" scoped>
    .topic-vote{
        margin-bottom: 3rem;
    }
    .vote-topic-item{
        width: 90%;
        margin: auto;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        h4{
            flex: 0.8;
            color: green;
        };
        .vote-number{
            flex: 0.2;
        }
    }
    #main{
        margin: auto;
    }
</style>