<template>
  <div align="center">
    <el-form class="login-form" autocomplete="on" label-position="center" :data="fileList">
      <h1>文件上传</h1>
    <br/>

      <el-table
        :data="tasks"
        style="width: 100%"
        @row-click="getDetails">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名字"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="地址"
          width="550">
        </el-table-column>
        <el-table-column
          width="100">
          <el-button type="primary" @click="Click" icon="el-icon-view">
            <span>运行</span>
          </el-button>
        </el-table-column>
      </el-table>


      <el-upload
        class="upload-demo"
        ref="upload"
        action="/tasks/upload"
        :file-list="fileList"
        :limit=1
        :on-success="getRes"
        :on-change="handleChange"
        :auto-upload="false">

        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">一次只能上传一个war文件，且不超过50MB</div>

      </el-upload>
    </el-form>

  </div>
</template>

<script>

/*  import {formatDate} from '@/utils/time.js'*/
  import axios from 'axios'
  axios.defaults.withCredentials=true;
  export default {
    data() {
      return {
        uploadUrl:'',
        fileList: [],
        tasks:[],
        isShow:false,
        isClick:false,
        team:{}
      }
    },
    computed: {
      student() {
        return sessionStorage.getItem("student")
      },
      dataUpTasks() {
        return this.tasks
      },
      role(){
        return sessionStorage.getItem('role')
      }
    },

    methods: {
      getRes(response,file){
        if (response.task) {
          this.$message(response.msg)
        }else {
          this.$message(response.msg)
        }
      },
      submitUpload() {
        this.$refs.upload.submit()
        setTimeout(() => {
          this.getAllTasks()
        }, 10000)
      },
      handleChange(file, fileList) {
        if (!file.response){
          this.uploadUrl = ""
        } else {
          this.uploadUrl = file.response.task.url
        }
      },
      getAllTasks() {
        axios.post('/tasks/teamTasks',qs.stringify({
          teamId:this.team.id
        }))
          .then(res => {
            console.log(res)
            this.tasks = res.data.tasks
            console.log(this.tasks)
          })
          .catch(err => {
            console.log(err)
          })
      },
      getDetails(row){
        if (this.isClick) {
          window.open(row.url, '_blank')
          this.isClick = false
        }
      },
      Click(){
        this.isClick = true
      },
    },
    beforeCreate() {
      this.team = JSON.parse(sessionStorage.getItem("team"))
      axios.post('/tasks/teamTasks',qs.stringify({
        teamId:this.team.id
      }))
        .then(res => {
          console.log(res)
          this.tasks = res.data.tasks
          console.log(this.tasks)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>
