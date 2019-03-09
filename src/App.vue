<template>
    <div id="app">
        <!-- <div v-if="!show">
            <router-view/>
        </div> -->
        <!-- <div v-else> -->
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看qqqqqqqqqqq</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>                <span>yyyyyyxxxxxxxxx</span>
            </el-header>
            <!-- 内容 -->
              <!-- <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu :default-openeds="['1','2']">
                        <el-submenu index="1">
                            <template slot="title">日常管理</template>
                            <el-menu-item index="1-1">需求管理</el-menu-item>
                            <el-menu-item index="1-2">项目管理</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">发布管理</template>
                            <el-menu-item index="2-1">待发布</el-menu-item>
                            <el-menu-item index="2-2">发布队列</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside> -->
            <div class="content">
              
                <div class="main-content">
                    <router-view/>
                    <!-- <el-footer>Footer</el-footer> -->
                </div>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            show: false,
        }
    },
    mounted() {
        // console.log(this.$route.name);
        // if (this.$route.name === 'login') {
        //     this.show = false;
        // }
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

.header{
    height: 100px;
}
.content{
    display: flex;
    flex-direction: row;
    flex: 1;
}

.main-content{
    flex: 1;
}

html,body {
    margin: 0;
    height: 100%;
}
</style>
