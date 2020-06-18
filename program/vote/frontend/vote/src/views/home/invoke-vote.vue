<template>
  <section class="invoke-vote">
      <h3>发起投票</h3>
      <section class="invoke-vote-content">
          <form role="form-horizontal">
            <div class="form-group row has-success">
                <section class="topictittle">
                    <label for="topictittle">
                        <h4>投票话题</h4>
                    </label>
                    <input class="form-control" type="text" placeholder="请输入投票话题" id="topictittle" name="topictittle">
                </section>
                <section class="chooses">
                    <h4>投票内容</h4>
                    <input class="form-control" type="text" placeholder="请输入投票话题" name="choose">
                    <input class="form-control" type="text" placeholder="请输入投票话题" name="choose">
                </section>
                <div class="addChooses" @click="addChooses">添加+</div>
            </div>
         </form>
        <button class="btn btn-success" @click="confirmLogin">确认投票</button>
        <div v-show="voteWarnning" class="voteWarnning">请将投票信息输入完整！</div>
      </section>
  </section>
</template>

<script>
export default {
    data(){
        return {
            voteWarnning:false,
        }
    },
    methods:{
        addChooses(){
            $('.chooses').append(`
                <input class="form-control" type="text" placeholder="请输入投票话题" name="choose">
            `)
        },
        confirmLogin(){
            this.validataVote()
            if(this.voteWarnning){
                return
            }
            const formstr = $('form').serialize()
            $.ajax({
                url:'http://192.168.124.42:8079/home/invoke-vote',
                type:'POST',
                data:formstr,
                success:(res) => {
                if(res.success){
                    if(res.data.errorCode == 0){
                        console.log('发起投票成功，跳转')
                        alert('发起投票成功！')
                        this.validatefailed = false
                        this.ToHomepage()
                    } else {
                        this.validatefailed = true
                    }
                }
                },
                error:(error) => {
                    console.log('上传失败',error)
                }
            })
        },
        validataVote(){
            this.voteWarnning = false
            $('input').each((idx,item) => {
                if(item.value === ''){
                    this.voteWarnning = true
                }
            })
        },
        ToHomepage(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss">
    .invoke-vote-content{
        margin-bottom: 20%;
        .topictittle{
            margin: auto;
            width: 70%;
        }
        .chooses{
            margin: auto;
            width: 70%;
            input{
                margin-top: 1rem;
                margin-bottom: 1rem;
            }
        }
        .addChooses{
            color: green;
            text-align: center;
            cursor: pointer;
        }
        .voteWarnning{
            margin: 1rem;
            color: red;
        }
    }
</style>