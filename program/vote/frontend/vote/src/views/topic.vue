<template>
    <section class="vote-topic">
        <h2>{{tittle}}</h2>
        <router-view class="view"></router-view>
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
    },
    methods:{
    }
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