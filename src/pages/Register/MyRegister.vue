<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a> </span>
      </h3>
      <!-- <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <button style="height: 38px; width: 90px; margin-left: 2px" @click="getphone(phone)">获取验证码</button>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" v-model="password" placeholder="请输入你的登录密码" />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" v-model="password1" placeholder="请输入确认密码" />
        <span class="error-msg">错误提示信息</span>
      </div> -->
      <div class="pop">
        <el-form :model="ruleForm" :rules="registerRules" label-position="right" ref="ruleForm" label-width="430px">
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" prop="code">
            <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            <button style="height: 37px; width: 87px; margin-left: 3px" class="plp" @click="getphone(ruleForm.phone)">获取验证码</button>
          </el-form-item>
          <el-form-item label="登录密码:" type="password" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入登录密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="password1">
            <el-input v-model="ruleForm.password1" type="password" placeholder="请输入确认密码"></el-input>
          </el-form-item>
          <el-form-item prop="tongyi">
            <el-checkbox-group v-model="ruleForm.tongyi">
              <el-checkbox class="controls" label="同意协议并注册《尚品汇用户协议》" name="tongyi"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>

      <!-- <div class="controls">
        <input name="m1" type="checkbox" :checked="tongyi" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div> -->
      <div class="btn">
        <button @click="addRegister(ruleForm.phone, ruleForm.password, ruleForm.code, ruleForm.password1)">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyRegister',
  data() {
    // 这个方法要写在用到这个方法的地方的前面
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3-9][0-9]\d{8}$/
        // 这里定义的reg变量没有加引号，所以是一种特殊的数据类型，即正则，可以直接用test()方法
        if (reg.test(value)) {
          callback()
        } else {
          // 具体错误信息没有提示
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      tongyi: true,

      // ------------------
      ruleForm: {
        // 手机号码
        phone: '',
        // 验证码
        code: '',
        password: '',
        password1: '',
        tongyi: []
      },
      registerRules: {
        phone: [
          { required: true, min: 11, message: '手机号不足11位', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '请六位数字的验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },

          { validator: validatePass, trigger: 'blur' }
        ],
        password1: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        tongyi: [{ type: 'array', required: true, message: '请勾选协议', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 获取验证码
    async getphone(phone) {
      try {
        phone && (await this.$store.dispatch('getphoneCode', phone))
        this.ruleForm.code = this.$store.state.loginANdregister.code
      } catch (error) {
        alert(error.message)
      }
    },
    // 注册账号
    async addRegister(phone, password, code, password1) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return false
        await this.$store.dispatch('getRegisterUser', { phone, password, code })
        this.$router.push('/login')
      })
      // try {
      //   // const { phone, password, code, password1 } = this
      // } catch (error) {
      //   alert(error.message)
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.plp {
  background-color: #ececec;
  border: 0;
  border-radius: 5px;
}
.el-input {
  width: 48%;
}
.pop {
  margin-top: 40px;
}

.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    // div:nth-of-type(1) {
    //   margin-top: 40px;
    // }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
