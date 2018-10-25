<template>
  <a-row id="login">
    <a-col :md="10" :lg="8" class="img-holder">
      <div class="info-holder">
        <h2 class="title">孚临风控中心商户端</h2>
        <p class="desc">努力让孚临风控中心成为全世界最牛B的风控平台。。</p>
        <img :src="graphicSvg" alt="孚临风控中心商户端"/>
      </div>
    </a-col>
    <a-col :md="14" :lg="16" class="form-holder">
      <div class="form-content">
        <div class="form-items">
          <div class="logo-wrap"><img :src="logoSvg" alt="" :style="{height: '80px'}"></div>
          <a-form
            :style="{width: '95%'}"
            :autoFormCreate="(form)=>{this.form = form}"
            @submit.prevent="login">
            <template>
              <a-tabs
                class="tab"
                :defaultActiveKey="activeTab"
                :animated="false"
                @change="setActiveTab">
                <a-tab-pane tab="账户密码登录" key="userName">
                  <a-form-item
                    fieldDecoratorId="email"
                    :fieldDecoratorOptions="{rules: rules.email}">
                    <a-input size="large" placeholder="E-mail Address">
                      <a-icon slot="prefix" type='user'/>
                    </a-input>
                  </a-form-item>

                  <a-form-item
                    fieldDecoratorId="password"
                    :fieldDecoratorOptions="{rules: rules.password}">
                    <a-input size="large" type='password' placeholder="Password">
                      <a-icon slot="prefix" type='lock'/>
                    </a-input>
                  </a-form-item>
                </a-tab-pane>

                <a-tab-pane tab="手机号登陆" key="phone">
                  <a-form-item
                    fieldDecoratorId="phone"
                    :fieldDecoratorOptions="{rules: rules.phone}">
                    <a-input size="large" placeholder="Mobile Number">
                      <a-icon slot="prefix" type='mobile'/>
                    </a-input>
                  </a-form-item>

                  <a-form-item>
                    <a-row :gutter="8">
                      <a-col :span="16">
                        <a-form-item
                          fieldDecoratorId="captcha"
                          :fieldDecoratorOptions="{rules: rules.captcha}">
                          <a-input size="large" placeholder="captch-btn">
                            <a-icon slot="prefix" type='mail'/>
                          </a-input>
                        </a-form-item>
                      </a-col>
                      <a-col :span="8">
                        <a-button
                          class="btn-block"
                          @click="getCaptch"
                          :disabled="!!count"
                          size="large">{{count ? `${count}s`:"获取验证码"}}</a-button>
                      </a-col>
                    </a-row>
                  </a-form-item>
                </a-tab-pane>
              </a-tabs>
              <a-form-item
                fieldDecoratorId="remember"
                :fieldDecoratorOptions="{
                  valuePropName: 'checked',
                  initialValue: true}">
                <a-checkbox>自动登录</a-checkbox>
                <a class="login-form-forgot" href="">忘记密码</a>
              </a-form-item>
              <a-form-item>
                <a-button
                  size="large" htmlType='submit' type="primary" class="btn-block">登录</a-button>
              </a-form-item>
            </template>
          </a-form>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import graphicSvg from '@/assets/svg/graphic.svg';

import logoSvg from '@/assets/svg/logo.svg';
import validator from '@/services/validator';

@Component()
export default class Login extends Vue {
  graphicSvg = graphicSvg;
  logoSvg = logoSvg;
  activeTab = 'userName';
  count = 0;
  rules = {
    phone: validator.phone,
    captcha: [validator.require('请输入验证码!')],
    email: validator.email,
    password: [validator.require('请输入您的密码!')],
  };

  login() {
    const file = {
      userName: ['email', 'password'],
      phone: ['phone', 'captcha'],
    };
    this.form.validateFields(file[this.activeTab], (err) => {
      if (!err) {
        this.$router.push('/');
      }
    });
  }

  setActiveTab(tab) {
    this.activeTab = tab;
  }

  getCaptch() {
    this.form.validateFields(['phone'], (err) => {
      if (!err) {
        this.count = 120;
        const fn = () => {
          this.count -= 1;
          if (this.count > 0) {
            setTimeout(fn, 1000);
          }
        };
        fn();
      }
    });
  }
}
</script>

<style lang='less' scoped>
  @import "~ant-design-vue/lib/style/themes/default.less";
  @deep: ~'>>>';

  #login {
    height: 100%;
    .img-holder {
      padding: 60px;
      height: 100%;
      background-color: @primary-color;
    }

    .info-holder {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      text-align: left;
      color: #fff;
    }

    .title {
      margin-bottom: 30px;
      font-weight: 900;
      font-size: 25px;
      max-width: 378px;
      padding-right: 30px;
      color: #fff;
    }

    .desc {
      margin-bottom: 50px;
      font-size: 19px;
      font-weight: 300;
      max-width: 378px;
      line-height: 28px;
    }

    .form-holder {
      background-color: #fff;
      height: 100%;
    }

    .form-content {
      padding: 60px;
      min-height: 100%;
      display: flex;
      align-content: center;
      justify-content: center;
      text-align: center;
    }

    .logo-wrap {
      margin-bottom: 15px;
    }

    @media (max-width: 768px) {
      .img-holder {
        display: none;
      }

      .form-content {
        padding: 0;
      }
    }

    .login-form-forgot {
      float: right;
    }
    .form-items {
      text-align: left;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      justify-content: center;

      .ant-tabs-bar {
        border-bottom: none;
        text-align: center;
        margin-bottom: 24px;
      }

      .ant-tabs-tab {
        font-size: 16px;
      }
    }

    .form-items @{deep} .ant-input-prefix{
      color: rgba(0,0,0,.25);
    }
  }

  .tab @{deep} .ant-tabs-nav-scroll{
    text-align: center;
  }

</style>
