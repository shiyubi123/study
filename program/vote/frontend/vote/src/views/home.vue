<template>
  <section>
      <header>
          <nav class="navbar navbar-default row header">
              <div class="welcome col-xs-12">欢迎！用户 {{nickname}}</div>
              <button class="btn btn-danger logout" @click="logout">退出</button>
          </nav>
      </header>
      <section class="body">
          <router-link :to="{name:'InvokeVote',query:{username:username,nickname:nickname}}">
              <button class="btn btn-info choose">发起投票</button>
          </router-link>
          <router-link :to="{name:'Topics',query:{username:username,nickname:nickname}}">
              <button class="btn btn-info choose">查看话题</button>
          </router-link>
          <router-view class="view"></router-view>
      </section>
      <footer>
          <nav class="navbar navbar-default navbar-fixed-bottom row footer">
              <div class="col-xs-12">实时投票小项目</div>
          </nav>
      </footer>
  </section>
</template>

<script>
export default {
    data(){
        return{
            username:null,
            nickname:null,
        }
    },
    mounted(){
        this.getUserInfo()
    },
    methods:{
        getUserInfo(){
            this.username = this.$route.query.username
            this.nickname = this.$route.query.nickname
        },
        logout(){
            this.$router.push('/')
        },
        
    }
}
</script>

<style lang="scss">
    body{
        min-width: 100%;
        min-height: 100%;
        overflow-x: hidden;
    }
    .header{
        margin: 0px;
        display: flex;
        align-items: center;
        position: relative;
        .logout{
            position: absolute;
            left: 1rem;
        }
    }
    .body{
        .choose{
            margin: 1rem;
        }
    }
    .footer{
        display: flex;
        align-items: center;
    }
</style>