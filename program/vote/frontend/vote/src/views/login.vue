<template>
  <section>
    <div class="loginPage">
      <h1>欢迎！请先登录</h1>
      <form role="form-horizontal">
        <div class="form-group row has-success">
          <label for="username">用户名</label>
          <input class="form-control" type="text" placeholder="请输入用户名" id="username" name="username">
        </div>
        <div class="form-group row has-success">
          <label for="password">密码</label>
          <input class="form-control" type="text" placeholder="请输入密码" id="password" name="password">
        </div>
      </form>
      <button class="btn btn-success" @click="confirmLogin">确认登陆</button>
      <button class="btn pull-right">注册账户</button>
      <div v-show="loginWarnning" class="loginWarnning">用户不存在或密码错误！</div>
    </div>
  </section>
  
</template>

<script>

export default {
  data(){
    return {
        loginWarnning:false,
        validatefailed:false
    }
  }, 
  methods:{
    confirmLogin(){
        this.validateUser()
        if(!this.loginWarnning){
            this.submmitFormdata()
        }
    },
    validateUser(){
      if(this.noUsername() || this.noPassword() || this.validatefailed){
        this.loginWarnning = true
      } else {
        this.loginWarnning = false
      }
      this.validatefailed = false
    },
    submmitFormdata(){
      const formstr = $('form').serialize()
      $.ajax({
        url:'http://192.168.124.42:8079/',
        type:'POST',
        data:formstr,
        success:(res) => {
          if(res.success){
            if(res.data.errorCode == 0){
              console.log('登录成功，跳转')
              this.validatefailed = false
              this.validateUser()
              this.ToHomepage(res.data)
            } else {
              this.validatefailed = true
              this.validateUser()
            }
          }
        },
        error:(error) => {
          console.log('上传失败',error)
        }
      })
    },
    ToHomepage(data){
      this.$router.push({name:'Home',query:data.userInfo})
    },
    noUsername(){
      const username = $('#username')
      return username.val().length === 0
    },
    noPassword(){
      const password = $('#password')
      return password.val().length === 0
    },
  },
  computed:{
    
  }
}

</script>

<style lang="scss">
  body{
    width: 100%;
    min-height: 100vh;
  }
  .loginPage{
    height: 500px;
    width: 40%;
    margin: auto;
    margin-top:calc((100vh - 500px) / 2) ;
    h1{
      text-align: center;
    }
    .form-horizontal{
      input{
        width: 20rem;
        margin: auto;
      }
    }
  }
  .loginWarnning{
    text-align: center;
    color: red;
  }
</style>