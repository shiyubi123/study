<template>
  <section>
    <h3>当前话题</h3>
    <section class="topics">
        <div v-for="(topic,index) in topics" :key="index">
            <div class="list-group-item topic">
                <h3 class="topic-tittle ">
                    {{topic.topictittle}}
                </h3>
                <div class="topic-btns">
                    <button class="btn btn-info" @click="seeTopic(topic)">查看</button>
                    <button class="btn btn-danger" @click="deleteTopic(topic.topictittle)">删除</button>
                </div>
            </div>
        </div>
    </section>
  </section>
</template>

<script>
export default {
    data(){
        return {
            topics:null
        }
    },
    async mounted(){
        let self = this
        await $.get('http://192.168.124.42:8079/home/topics',function(data,status){
            self.topics = data
            console.log(data)
        });
    },
    methods:{
        seeTopic(topic){
            this.$router.push({name:'Topic',query:topic})
        },
        deleteTopic(topictittle){
            let self = this
            console.log(topictittle)
            $.post('http://192.168.124.42:8079/home/topics/delete',{topictittle:topictittle},function(data,status){
                self.topics = data
            })
        }
    }
}
</script>

<style lang="scss">
    .topic{
        width: 90%;
        margin: auto;
        display: flex;
        align-items: center;
        .topic-tittle{
            flex: 1;
        }
        .topic-btns{
            button{
                margin: 0.5rem;
            }
        }
    }
</style>