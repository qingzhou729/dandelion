<template>
<div class="wrap">
    <!-- 头部文案 -->
    <div>
        <h2>我的任务</h2>
    </div>
    <!-- 按钮区域 -->
    <div>
        <el-button type="primary" @click="addDemand" style="margin-right:20px;">新建需求</el-button>
        <el-select v-model="value" placeholder="筛选" @change="selectChange">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>

    <div style="height:20px"></div>
    <!-- 需求列表 -->
    <el-table border ref="filterTable" :data="tableData" width="100%">
        <el-table-column prop="create_time" label="日期" sortable width="180">
        </el-table-column>
        <el-table-column prop="title" label="需求标题"></el-table-column>
        <el-table-column prop="demand_desc" label="需求描述"></el-table-column>
        <el-table-column prop="status" label="状态" width="110px">
            <template slot-scope="scope">
                <!-- status 
                    1、新建
                    2、开发中
                    3、部署到预发环境，待验证
                    4、预发验证通过，待正式发布
                    5、正式环境部署、待验证
                    6、正式环境验证，待合并主干
                    7、完成合并主干，发布完成
                -->
                <el-tag :type="'primary'" v-if="scope.row.status === 1" disable-transitions>新建</el-tag>
                <el-tag :type="'info'" v-if="scope.row.status === 2" disable-transitions>开发中</el-tag>
                <el-tag :type="'warning'" v-if="scope.row.status === 3" disable-transitions>发布中</el-tag>
                <el-tag :type="'warning'" v-if="scope.row.status === 4" disable-transitions>发布中</el-tag>
                <el-tag :type="'warning'" v-if="scope.row.status === 5" disable-transitions>发布中</el-tag>
                <el-tag :type="'warning'" v-if="scope.row.status === 6" disable-transitions>发布中</el-tag>
                <el-tag :type="'success'" v-if="scope.row.status === 7" disable-transitions>已完结</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="分支管理" width="200px">
            <template slot-scope="scope">
                <el-button v-if="!scope.row.branch_name" size="mini" @click="createBranch(scope)">创建分支</el-button>
                <p>{{scope.row.branch_name}}</p>
                <el-button v-if="scope.row.branch_name && scope.row.status !== 7" size="mini" @click="goPublish()">去发布</el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
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
                <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <!-- 新建分支 -->
    <el-dialog title="新建分支" :visible.sync="dialogVisible1" width="60%">
        <el-form ref="form1" :model="form1" label-width="80px">
            <el-form-item label="项目名称">
                <el-select @change="projectChange" v-model="form1.pid" placeholder="请选择项目">
                    <el-option v-for="(item, index) in projectData" :label="item.project_name" :value="item.pid" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布时间">
                <el-col :span="11">
                    <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form1.pub_time" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit1">立即创建<i v-if="showBranchLoading" class="el-icon-loading"></i></el-button>
                <el-button @click="dialogVisible1 = false">取消</el-button>
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
                <el-button type="primary" @click="updateSubmit">立即修改</el-button>
                <el-button @click="updateDemand = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
</template>

<script>
import ajax from '../../common/baseAjax';

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
            activeName2: 1,
            options: [{
                value: '',
                label: '所有需求'
            }, {
                value: 1,
                label: '新建'
            }, {
                value: 2,
                label: '开发中'
            }, {
                value: 3,
                label: '发布中'
            }, {
                value: 7,
                label: '已完结'
            }],
            value: '',
            pid: '',
            showBranchLoading: false,
        };
    },
    mounted() {
        this.getData();
        this.getProjectInfo();
    },
    methods: {
        selectChange(e) {
            if (e === 3) {
                e = `3,4,5,6`;
            }
            // console.log(e)
            this.getData(e);
        },
        goPublish() {
            this.$router.push({
                path: '/waitForRelease',
            });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleEdit(e) {
            this.updateDemand = true;
            this.form = {
                title: e.title,
                desc: e.demand_desc,
                did: e.did,
            }
        },
        projectChange(e) {
            console.log(e);
            this.pid = e;
        },
        updateSubmit() {
            ajax({
                url: 'updateDemand',
                params: this.form,
            }).then(res => {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.getData();
                this.updateDemand = false;
                this.form = {};
            })
        },
        currentChange(e) {
            this.page = e;
            this.getData();
        },
        stage(row) {
            console.log(row)
            ajax({
                url: 'stage',
                params: {
                    branch_name: row.branch_name,
                    did: row.did,
                },
            }).then(res => {

                console.log(res);
                if (res.data.success) {
                    console.log('预发布成功');
                }
            })
        },
        getData(status) {
            ajax({
                url: 'selectUserDemand',
                params: {
                    page: this.page,
                    status: status,
                },
            }).then(res => {
                this.totalPage = res.count;
                this.tableData = res.data;
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
            ajax({
                url: 'selectProject',
                withCredentials: true,
            }).then(res => {
                this.projectData = res.data;
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
            ajax({
                url: 'insertDemand',
                params: this.form,
            }).then(res => {
                this.dialogVisible = false;
                this.getData();
            });
        },
        onSubmit1() {
            this.showBranchLoading = true;
            const params = Object.assign(this.form1, {
                did: this.did,
                pid: this.pid,
            })
            ajax({
                url: 'createBranch',
                params,
            }).then(res => {
                console.log(res);
                this.showBranchLoading = false;
                this.dialogVisible1 = false;
                this.getData();
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
            this.$confirm('确认要删除吗？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        handleDelete(item) {
            this.handleClose(() => {
                ajax({
                    url: 'deleteDemand',
                    params: {
                        did: item.did,
                    },
                }).then(res => {
                    console.log(res);
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getData();
                })
            })
        },
    },
};
</script>

<style scoped>
.wrap {
    padding: 10px 30px 30px 30px;
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
