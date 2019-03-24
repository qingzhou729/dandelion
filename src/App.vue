<template>
<div id="app">
    <el-header style="text-align: right; font-size: 18px;">
        <span>yuxue</span>
    </el-header>
    <div class="content">
        <el-aside v-if="showAside" width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="defaultMenuConfig">
                <el-submenu v-for="(item, index) in menuConfig" :key="index" :index="item.submenu.index">
                    <template slot="title"><i class="el-icon-menu"></i>{{item.submenu.title}}</template>
                    <el-menu-item-group>
                        <el-menu-item @click="goLink(ele.router)" v-for="(ele, i) in item.menugroup" :key="i" :index="ele.index">{{ele.title}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <div class="main-content">
            <router-view />
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            show: false,
            defaultMenuConfig: ['1'],
            menuConfig: [
                {
                    submenu: {
                        title: '需求管理',
                        index: '1',
                    },
                    menugroup: [
                        {
                            title: '我的任务',
                            router: '/index',
                            index: "1-1",
                        },
                        {
                            title: '发布队列',
                            router: '/waitForRelease',
                            index: "1-2",
                        },
                    ],
                },
                {
                    submenu: {
                        title: '项目管理',
                        index: '2',
                    },
                    menugroup: [
                        {
                            title: '项目列表',
                            router: '/projectList',
                            index: "2-1",
                        },
                    ],
                },
            ],
            showAside: true,
        }
    },
    watch:{
        $route(to,from){
            if (to.path !== '/login') {
                this.showAside = true;
            }
        }
    },
    mounted() {
        console.log(this.$route.path)
        if (this.$route.path === '/login') {
            this.showAside = false;
        }
    },
    methods: {
        goLink(path) {
            this.$router.push({
                path,
            });
        },
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

.header {
    height: 100px;
}

.content {
    display: flex;
    flex-direction: row;
    flex: 1;
    height: 100%;
}

.main-content {
    box-sizing: border-box;
    flex: 1;
    height: 100%;
    flex-shrink: 0;
    overflow: auto;
}

.el-menu-item-group__title{
    padding: 0;
}

.el-icon-message, .el-icon-menu{
    position: relative;
    top: -2px;
}

html,
body {
    margin: 0;
    height: 100%;
}
</style>
