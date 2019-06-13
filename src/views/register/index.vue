<template lang="html">
  <div align="center">
    <el-form ref="form" :model="form" :rules="sendCodeRules" class="login-form" autocomplete="on" label-position="center">
      <div class="title-container">
        <h1 align="center">学生端注册</h1>
      </div>

        <el-form-item prop="email" style="width: 380px">
          <span class="svg-container">
          </span>
          <el-input
            ref="form.email"
            v-model="form.email"
            name="form.email"
            type="text"
            tabindex="1"
            autocomplete="on"
            style="width: 380px"
            placeholder="email"
          />
        </el-form-item>
      <el-button :loading="loading" type="primary" style="width:20%;margin-bottom:30px;" @click.native.prevent='getCode' :disabled="disabled">{{buttonTxt}}</el-button>
      </el-form>

    <el-form ref="form" :model="form" :rules="registerRules" class="login-form" autocomplete="on" label-position="center">

      <el-form-item prop="code" style="width: 380px">
          <span class="svg-container">
          </span>
        <el-input
          ref="form.code"
          v-model="form.code"
          name="form.code"
          type="text"
          tabindex="1"
          autocomplete="on"
          style="width: 380px"
          placeholder="code"
        />
      </el-form-item>

      <el-form-item prop="gender" style="width: 380px">
        <el-radio-group v-model="form.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>

      </el-form-item>
      <el-form-item prop="name" style="width: 380px">
          <span class="svg-container">
          </span>
        <el-input
          ref="form.name"
          v-model="form.name"
          name="form.name"
          type="text"
          tabindex="1"
          autocomplete="on"
          style="width: 380px"
          placeholder="name"
        />
      </el-form-item>

      <el-form-item prop="number" style="width: 380px">
          <span class="svg-container">
          </span>
        <el-input
          ref="form.number"
          v-model="form.number"
          name="form.number"
          type="text"
          tabindex="1"
          autocomplete="on"
          style="width: 380px"
          placeholder="number"
        />
      </el-form-item>

      <el-form-item prop="password" style="width: 380px">
          <span class="svg-container">
          </span>
      <el-input
        ref="form.password"
        v-model="form.password"
        name="form.password"
        :type="passwordType"
        tabindex="1"
        autocomplete="on"
        style="width: 380px"
        placeholder="password"
      />
    </el-form-item>
      <el-button :loading="loading" type="primary" style="width:20%;margin-bottom:30px;" @click.native.prevent='onSubmit'>注册</el-button>
    </el-form>
  </div>
</template>

<script>
  import {validEmail, validNumber} from "@/utils/validate";
  import axios from 'axios'
  axios.defaults.withCredentials=true;
  import qs from 'qs'
  export default {
    data() {
      const validateEmail = (rule, value, callback) => {
        if (!validEmail(value)) {
          callback(new Error('请输入正确的邮箱格式'))
        } else {
          callback()
        }
      }

      const validateCode = (rule, value, callback) => {
        if (value.length === 6) {
          callback()
        }else{
          callback(new Error('验证码长度错误'))
        }
      }


      return{
        disabled:false,
        time:0,
        buttonTxt:"获取验证码",
        passwordType: 'password',

        sendCodeForm:{
          email:''
        },
        form: {
          code: '',
          email: '',
          gender: '',
          name: '',
          number: '',
          password:''
      },

        sendCodeRules:{
          email: [{ required: true, trigger: 'blur', validator: validateEmail }]
        },
        registerRules: {
          name: [{ required: true, trigger: 'blur'}],
          code: [{ required: true, trigger: 'blur'}],
          gender: [{ required: true, trigger: 'blur'}],
          email: [{ required: true, trigger: 'blur', validator: validateEmail }],
          number: [{ required: true, trigger: 'blur'}],
          password: [{ required: true, trigger: 'blur'}]
        },

        loading:false,
        otherQuery:{}
      }
    },

    methods: {
      sendCode() {
        this.$refs.sendCodeForm.validate(valid => {
          if (valid) {
            this.time=60
            this.disabled=true
            this.timer()
            this.loading = true
            this.$store.dispatch('student/sendCode', this.sendCodeForm)
              .then(() => {
                this.loading = false
                this.$message("验证码发送成功!")
              })
              .catch(() => {
                this.$router.push({ path: '/student/login', query: this.otherQuery })
                this.$message("此账号已经注册,请登录")
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      studentRegister() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.form.email = this.sendCodeForm.email
            console.log(this.form)
            this.$store.dispatch('student/studentRegister', this.form)
              .then(() => {
                this.loading = false
                this.$message("注册成功！")
              })
              .catch(() => {
                this.$router.push({ path: '/student/login', query: this.otherQuery })
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      timer() {
        if (this.time > 0) {
          this.time--;
          this.buttonTxt=this.time+"s后重新获取";
          setTimeout(this.timer, 1000);
        } else{
          this.time=0;
          this.buttonTxt="获取验证码";
          this.disabled=false;
        }
      },

      onSubmit() {
        const _this = this
        axios.post('http://140.143.23.218:8081/student/register',qs.stringify({
          code: _this.form.code,
          email: _this.form.email,
          gender: _this.form.gender,
          name: _this.form.name,
          number: _this.form.number,
          password: _this.form.password
        }))
          .then(response => {
            console.log(response);
            if(response.data.student){
               this.$store.commit('addStudent', response);
              this.$router.push('/student/login')
            }else{
              alert(response.data.msg)
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
      getCode() {
        const _this = this
        axios.post('http://140.143.23.218:8081/student/sendCode',qs.stringify({
          email:_this.form.email
        }))
          .then(response => {
            this.time=60
            this.disabled=true
            this.timer()
            console.log(response);
          })
          .catch(err => {
            this.time=60
            this.disabled=true
            this.timer()
            console.log(err);
          })
      }


    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $bg;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    a, a:focus, a:hover {
      cursor: pointer;
      color: inherit;
      text-decoration: none;
    }

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }

    .hezi {
      height: 10%;
    }
  }
</style>
