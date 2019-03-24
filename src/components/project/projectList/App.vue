<template>
<div class="wrap">
    <!-- 头部文案 -->
    <div>
        <h2>项目列表</h2>
    </div>
    <!-- 需求列表 -->
    <el-table border ref="filterTable" :data="projectData" width="100%">
        <el-table-column prop="project_name" label="项目名称"></el-table-column>
        <el-table-column prop="project_shortid" label="项目描述"></el-table-column>
        <el-table-column prop="project_url" label="项目url"></el-table-column>
        <el-table-column prop="project_dir" label="项目目录(project)"></el-table-column>
        <el-table-column prop="project_pre" label="验证cookie"></el-table-column>
        <el-table-column prop="project_predir" label="预发目录(pre-dir)"></el-table-column>
        <el-table-column prop="project_prodir" label="生产目录(pro-dir)"></el-table-column>
    </el-table>
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
        pretest(row) {
            console.log(row)
            ajax({
                url: 'pretest',
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
        production(row) {
            console.log(row)
            ajax({
                url: 'production',
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
        mergeToMaster(row) {
            ajax({
                url: 'mergeToMaster',
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
                    status: `2,3,4,5,6`,
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
        updateDemandStatus(row, status) {
            ajax({
                url: 'updateDemandStatus',
                params: {
                    did: row.did,
                    status,
                },
            }).then(res => {
                console.log(res);
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
