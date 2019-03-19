<template>
<div class="wrap">
    <el-button type="primary" @click="addDemand">新建需求</el-button>
    <div style="height:20px"></div>
    <!-- 需求列表 -->
    <el-table border ref="filterTable" :data="tableData" width="100%">
        <el-table-column prop="create_time" label="日期" sortable width="180">
        </el-table-column>
        <el-table-column prop="title" label="需求" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
                <el-tag :type="'primary'" disable-transitions>{{scope.row.statusText}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="分支管理">
            <template slot-scope="scope">
                <el-button size="mini" @click="createBranch(scope)">创建分支</el-button>
                {{scope.row.branch_name}}
            </template>
        </el-table-column>
        <el-table-column label="发布">
            <template slot-scope="scope">
                <el-button size="mini" @click="stage(scope.row)">去发布</el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination class="pagination" background layout="prev, pager, next, total" :current-page="page" @current-change="currentChange" :total="totalPage">
    </el-pagination>
    <!-- 新建需求 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="需求名称">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="需求描述">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <!-- 新建分支 -->
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="60%">
        <el-form ref="form1" :model="form1" label-width="80px">
            <el-form-item label="项目名称">
                <el-select v-model="form1.pid" placeholder="请选择项目">
                    <el-option v-for="(item, index) in projectData" :label="item.project_name" :value="item.pid" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布时间">
                <el-col :span="11">
                    <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form1.pub_time" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit1">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <!-- 修改需求 -->
    <el-dialog title="修改需求信息" :visible.sync="updateDemand" width="60%">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="需求名称">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="需求描述">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            tableData: [],
            projectData: [],
            form: {
                title: '',
                desc: ''
            },
            form1: {
                pid: '',
                pub_time: ''
            },
            dialogVisible: false,
            dialogVisible1: false,
            updateDemand: false,
            did: null,
            page: 1,
            totalPage: 1,
        };
    },
    mounted() {
        this.getData();
        this.getProjectInfo();
    },
    methods: {
        handleEdit() {
            this.updateDemand = true;
        },
        currentChange(e) {
            this.page = e;
            this.getData();
        },
        stage(row) {
            console.log(row)
            axios({
                url: 'http://test.xue.com:3001/api/stage',
                method: 'get',
                params: {
                    branch_name: row.branch_name,
                    did: row.did,
                },
                withCredentials: true,
            }).then(res => {

                console.log(res);
                if (res.data.success) {
                    console.log('预发布成功');
                }
            })
        },
        getData() {
            axios({
                url: 'http://test.xue.com:3001/api/selectUserDemand',
                method: 'get',
                params: {
                    page: this.page
                },
                withCredentials: true,
            }).then(res => {
                console.log(res);
                this.totalPage = res.data.count;
                this.tableData = res.data.data;
                this.tableData.forEach((item) => {
                    if (item.status === 1) {
                        item.statusText = '新建';
                    } else if (item.status === 2) {
                        item.statusText = '开发中';
                    } else if (item.status === 3) {
                        item.statusText = '预发待验证';
                    }
                })
            })
        },
        getProjectInfo() {
            axios({
                url: 'http://test.xue.com:3001/api/selectProject',
                method: 'get',
                withCredentials: true,
            }).then(res => {
                console.log(res);
                this.projectData = res.data.data;
            })
        },
        createBranch(item) {
            this.dialogVisible1 = true;
            console.log(item);
            this.did = item.row.did;
        },
        login() {
            this.$router.push({
                path: '/index'
            })
        },
        onSubmit() {
            axios({
                url: 'http://test.xue.com:3001/api/insertDemand',
                method: 'get',
                params: this.form,
                withCredentials: true,
            }).then(res => {
                console.log(res);
                this.dialogVisible = false;
                this.getData();
            })
            console.log('submit!');
            console.log(this.form);
        },
        onSubmit1() {
            const params = Object.assign(this.form1, {
                did: this.did,
            })
            axios({
                url: 'http://test.xue.com:3001/api/createBranch',
                method: 'get',
                params,
                withCredentials: true,
            }).then(res => {
                console.log(res);
                this.dialogVisible1 = false;
            })
            console.log(this.form1)
        },
        addDemand() {
            this.dialogVisible = true;
        },
        resetDateFilter() {
            this.$refs.filterTable.clearFilter('date');
        },
        clearFilter() {
            this.$refs.filterTable.clearFilter();
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        handleDelete(item) {
            console.log(item)
            axios({
                url: 'http://test.xue.com:3001/api/deleteDemand',
                method: 'get',
                params: {
                    did: item.did,
                },
                withCredentials: true,
            }).then(res => {
                console.log(res);
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.getData();
            })
        },
    },
};
</script>

<style scoped>
.wrap {
    padding: 30px;
    box-sizing: border-box;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}

.el-pagination {
    width: 400px;

    margin: 0 auto;
    margin-top: 20px;
}
</style>
