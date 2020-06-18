<template>
    <section class="topic-vote">
        <label class="radio list-group-item vote-topic-item" v-for="choose in chooses" :key="choose.voteName">
            <input type="radio" :name="tittle" :id="choose.voteName">
            {{choose.voteName}}
        </label>
        <button class="btn btn-success" @click="confirmVote()">确认投票</button>
        <button class="btn btn-info" @click="goback">返回上级</button>
    </section>
</template>

<script>
export default {
    data(){
        return{
            tittle:'',
            chooses:null,
        }
    },
    mounted(){
        this.tittle = this.$route.query.topictittle
        this.chooses = this.$route.query.chooses

        
    },
    methods:{
        confirmVote(){
            const voteName = $('input:radio:checked').prop('id')

            $.post('http://192.168.124.42:8079/home/topic/vote',{
                tittle:this.tittle,
                choose:voteName
            }).then((res,status)=>{
                this.chooses = res.data.vote.chooses
            })

            //发送信息给服务端
            this.$socket.emit('vote',{
                tittle:this.tittle,
                choose:voteName
            })
            this.$router.push({name:'Result',query:{chooses:this.chooses}})

            this.$router.push({name:'Result'})
        },
        goback(){
            this.$router.go(-1)
        }
    },
}
</script>

<style lang="scss" scoped>
    .vote-topic-item{
        width: 90%;
        margin: auto;
        margin-bottom: 1.5rem;
    }
    button{
        margin: 1.5rem;
    }
</style>