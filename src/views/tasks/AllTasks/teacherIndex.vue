<template>
  <div>
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
          <a :href="getUrl" target="view_window">
<!--            <el-button @click="getUrl" type="primary" icon="el-icon-view">-->
              运行
<!--            </el-button>-->
          </a>
<!--        <el-link>查看<i class="el-icon-view el-icon&#45;&#45;right"></i> </el-link>-->
      </el-table-column>
      <el-table-column
        width="100">
        <el-button type="primary" v-if="role === 'student'">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  axios.defaults.withCredentials=true;
  export default {
    name: 'SHPStudent',
    data(){
      return {
        fileList:[],
        tasks:[],
        url:''
      }
    },
    computed:{
      student(){
        return sessionStorage.getItem("student")
      },
      dataUpTasks(){
        return this.tasks
      },
      role() {
        return sessionStorage.getItem('role')
      },
      getUrl(){
        return this.url
      }
    },
    methods:{
      deleteTask(event){
        alert('确定删除？')
        axios.post('tasks/delete',qs.stringify({
          taskId:event.target.id
        }))
          .then(res => {
            console.log(res)
            this.getAllTasks()
          })
          .catch(err => {
            console.log(err)
          })
      },
      getDetails(row){
        this.url = row.url
        console.log(row)
      }

    },
    beforeCreate(){
      axios.post('/tasks/AllTask')
        .then(res => {
          console.log(res)
          if (!res.data.student){
            this.$message(res.data.tasks)
          }
          this.tasks = res.data.tasks
        })
        .catch(err =>{
          console.log(err)
        })
    },

  }
</script>

<style scoped>

</style>
