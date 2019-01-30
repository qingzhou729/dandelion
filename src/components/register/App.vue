
<template>
    <div>
        <div class="login-wrap">
            <el-input placeholder="请输入内容" v-model="account">
                <template slot="prepend">账号</template>
            </el-input>
            <div class="blank"></div>
            <el-input placeholder="请输入内容" v-model="password">
                <template slot="prepend">密码</template>
            </el-input>
            <div class="blank"></div>
            <el-button style="width: 350px;" type="primary" @click="register">注册</el-button>
            <div class="blank"></div>
            <el-button type="text" style="width: 350px;">去登录</el-button>
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
    mounted() {
    },
    methods: {
        register() {
            axios({
                url: 'http://127.0.0.1:3001/api/register',
                method: 'post',
                data: {
                    account: this.account,
                    password: this.password,
                },
            }).then(res => {
                console.log(res);
            })

            // axios({
            //     url: 'http://127.0.0.1:3001/api/login',
            //     method: 'get',
            //     params: {
            //         account: this.account,
            //         password: this.password,
            //     },
            //     withCredentials: true, // 允许设置凭证
            // }).then(res => {
            //     console.log(res);
            // })


            //  $.ajax({
            //     type: 'POST',
            //     url: 'http://127.0.0.1:3001/api/login',
            //     data: {
            //         account: this.account,
            //         password: this.password,
            //     },
            //     xhrFields: {
            //         withCredentials: true,
            //     },
            //     dataType: 'json',
            //     success(rsp) {
            //         console.log(`接口`);
            //     },
            //     error() {
            //         note('网络错误,请稍后重试');
            //     },
            // });
        },
    },
};
</script>

<style scoped>
h1 {
    margin-top: 150px;
}
.login-wrap{
    width: 350px;
    margin: 0 auto;
    margin-top: 150px;
}
.blank{
    height: 20px;
}
</style>


