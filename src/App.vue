<template>
<div id="app">
    <el-header style="text-align: right; font-size: 18px;">
        <span>苍耳</span>
    </el-header>
    
    <div class="content">
        <div class="main-content">
            <router-view />
        </div>
    </div>
</div>
<!-- </div> -->
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            show: false,
        }
    },
    mounted() {
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
}

.main-content {
    flex: 1;
}

html,
body {
    margin: 0;
    height: 100%;
}
</style>
