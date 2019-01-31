
<template>
    <div>
        <el-button type="primary" @click="addDemand">新建需求</el-button>
        <!-- 需求列表 -->
        <el-table border ref="filterTable" :data="tableData" style="width: 100%">
            <el-table-column
                prop="create_time"
                label="日期"
                sortable
                width="180">
            </el-table-column>
            <el-table-column
                prop="title"
                label="需求"
                width="180">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态">
                <template slot-scope="scope">
                    <el-tag
                    :type="'primary'"
                    disable-transitions>{{scope.row.status === 1 ? "新建" : ''}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="分支管理">
                <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="dialogVisible1 = true">创建分支</el-button>
                </template>
            </el-table-column>
            <el-table-column label="发布">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">去发布</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- 新建需求 -->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="60%"
            >
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
          <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="项目名称">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="m" value="shanghai"></el-option>
                  <el-option label="pc" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发布时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
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
        form: {
          title: '',
          desc: ''
        },
         dialogVisible: false,
         dialogVisible1: false
        };
    },
    mounted() { 
      this.getData();
    },
    methods: {
        getData(){
            axios({
                url: 'http://127.0.0.1:3001/api/selectUserDemand',
                method: 'get',
                params: this.form,
                withCredentials: true,
            }).then(res => {
                console.log(res);
                this.tableData = res.data.data;
            })
        },
        login() {
            this.$router.push({
                path: '/index'
            })
        },
        onSubmit() {
           axios({
                url: 'http://127.0.0.1:3001/api/insertDemand',
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
      }
    },
};
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>


