<template>
    <div class="container">
      <form action="">
          <h5>主页页面</h5>
          <input type="text" id="phone" name="phone" v-model="phone" placeholder="请输入手机号(学生请勿注册)" maxlength="11" minlength="11">
          <br>
          <input type="text" id="verify" name="code" v-model="code" placeholder="请输入验证码"><span class="btn" @click="send">发送验证码</span>
          <br>
          <input type="password" id="password" v-model="password" name="password" placeholder="请输入6~16位密码" maxlength="11" minlength="6">
          <br>
          <span class="btn" id="submit" @click="submit">注册</span>
      </form>
      <div style="margin-top: 3em;">
          <h4>注册接口返回数据</h4>
          <div id="return">

          </div>
      </div>
    </div>
</template>
<script>
import * as api from 'api/api'

export default {
  data() {
    return { 
        phone: '',
        code: '',
        password: '123'
     }
  },
  methods: {
    send() {
      api.get('/VerifyCode/sendRegisterVerifyCode?phone='+this.phone)
      .then( res => {
        console.log(res)
      })
    },
    submit() {
      var payload = `?phone=${this.phone}&code=${this.code}&password=${this.password}`
      api.get('/customerManage/addCustomer'+ payload)
          .then( res => {
            console.log(res)
          })
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    padding: 50px;
    input  { border: 1px solid #ccc; height: 2em; margin: .5em }
    form {
      // padding: 0 50px;
    }
    .btn {
      background:#ff8800;
      padding: .3em .8em;
    }
  }
</style>

