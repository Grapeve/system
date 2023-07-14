<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <img
          class="logo"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        />
        <div class="name">
          <div class="tips">电商管理系统</div>
        </div>
      </div>
      <el-form
        label-position="top"
        :rules="state.rules"
        :model="state.ruleForm"
        ref="loginForm"
        class="login-form"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            v-model.trim="state.ruleForm.username"
            autocomplete="off"
            placeholder="admin"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model.trim="state.ruleForm.password"
            autocomplete="off"
            placeholder="123456"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submitForm">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import axios from '@/utils/axios'
import md5 from 'js-md5'
import { reactive, ref } from 'vue'
import { localSet } from '@/utils'
const loginForm = ref(null)
const state = reactive({
  ruleForm: {
    username: '',
    password: ''
  },
  rules: {
    username: [{ required: 'true', message: '账户不能为空', trigger: 'blur' }],
    password: [{ required: 'true', message: '密码不能为空', trigger: 'blur' }]
  }
})
const submitForm = async () => {
  loginForm.value.validate((valid) => {
    if (valid) {
      axios
        .post('/adminUser/login', {
          userName: state.ruleForm.username || '',
          passwordMd5: md5(state.ruleForm.password)
        })
        .then((res) => {
          localSet('token', res)
          window.location.href = '/'
        })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style scoped>
.login-body {
  display: flex;
  height: 100%;
  place-content: center;
  place-items: center;
  width: 100%;
  background-color: #fff;
}
.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}
.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.head .title {
  font-size: 28px;
  color: #1baeae;
  font-weight: bold;
}
.head .tips {
  font-size: 24px;
  color: #999;
}
.head .logo {
  border-radius: 10%;
}
.login-form {
  width: 70%;
  margin: 0 auto;
}
.login-form {
  :deep(.el-form--label-top .el-form-item__label) {
    padding: 0;
  }
}
.login-form {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
