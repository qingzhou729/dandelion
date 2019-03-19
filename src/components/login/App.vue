<template>
<div>
    <h1 class="title">登录</h1>
    <div class="login-wrap">
        <el-input placeholder="请输入手机号" v-model="account">
            <template slot="prepend">账号</template>
        </el-input>
        <div class="blank"></div>
        <el-input placeholder="请输入密码" v-model="password">
            <template slot="prepend">密码</template>
        </el-input>
        <div class="blank"></div>
        <el-button style="width: 350px;" type="primary" @click="login">登录</el-button>
        <div class="blank"></div>
        <el-button type="text" style="width: 350px;" @click="goRegister">去注册</el-button>
    </div>
</div>
</template>

<script>
import axios from 'axios';
// axios.defaults.withCredentials = true;
// // axios.defaults.crossDomain = true;

export default {
    data() {
        return {
            labelPosition: 'left',
            account: '18757153919',
            password: '123456',
        };
    },
    mounted() {},
    methods: {
        login() {
            axios({
                url: 'http://test.xue.com:3001/api/login',
                method: 'post',
                data: {
                    account: this.account,
                    password: this.password,
                },
                withCredentials: true, // 允许设置凭证
            }).then(res => {
                console.log(res.data);
                if (res.data.success) {
                    this.$router.push({
                        path: '/index'
                    })
                }
            })
        },
        goRegister() {
            this.$router.push({
                path: '/register'
            })
        },
    },
};
</script>

<style scoped>
h1 {
    margin-top: 150px;
}

.login-wrap {
    width: 350px;
    margin: 0 auto;
    margin-top: 50px;
}

.blank {
    height: 20px;
}

.title {
    text-align: center;
}
</style>
