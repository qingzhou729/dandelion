<template>
<div class="wrap">
    <!-- 头部文案 -->
    <div>
        <h2>正在发布中的所有需求</h2>
    </div>
    <!-- 需求列表 -->
    <el-table border ref="filterTable" :data="tableData" width="100%">
        <el-table-column prop="create_time" label="日期" sortable width="180">
        </el-table-column>
        <el-table-column prop="title" label="需求标题"></el-table-column>
        <el-table-column prop="status" label="状态" width="110px">
            <template slot-scope="scope">
                <el-tag :type="'primary'" disable-transitions>{{scope.row.statusText}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="分支管理" width="200px">
            <template slot-scope="scope">
                <el-button v-if="!scope.row.branch_name" size="mini" @click="createBranch(scope)">创建分支</el-button>
                {{scope.row.branch_name}}
            </template>
        </el-table-column>
        <el-table-column label="发布" width="110px">
            <template slot-scope="scope">
                <el-button size="mini" @click="stage(scope.row)">去发布</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination class="pagination" background layout="prev, pager, next, total" :current-page="page" @current-change="currentChange" :total="totalPage">
    </el-pagination>
</div>
</template>

<script>
import ajax from '../../../common/baseAjax';

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
            activeName2: 'first',
            options: [{
                value: '选项1',
                label: '所有需求'
            }, {
                value: '选项2',
                label: '新建'
            }, {
                value: '选项3',
                label: '发布中'
            }, {
                value: '选项4',
                label: '已完结'
            }],
            value: ''
        };
    },
    mounted() {
        this.getData();
        this.getProjectInfo();
    },
    methods: {
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
        getData() {
            ajax({
                url: 'selectUserDemand',
                params: {
                    page: this.page,
                    type: 1,
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
            const params = Object.assign(this.form1, {
                did: this.did,
            })
            ajax({
                url: 'createBranch',
                params,
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
