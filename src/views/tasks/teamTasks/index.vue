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

        <el-button type="success" icon="el-icon-view" @click="Click">运行</el-button>
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
      name: "index",
      data(){
          return {
            tasks:[],
            isClick:false,
            team:{}
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
        getDetails(row) {
          if (this.isClick) {
            window.open(row.url, '_blank')
            this.isClick = false
          }
        },
        Click(){
          this.isClick = true
        }

      },
      beforeCreate(){
        this.team = JSON.parse(sessionStorage.getItem("team"))
        axios.post('/tasks/teamTasks',qs.stringify({
          teamId:this.team.id
        }))
          .then(res => {
            console.log(res)
            this.tasks = res.data.tasks
            console.log(this.tasks)
          })
          .catch(err =>{
            console.log(err)
          })
      },
    }
</script>

<style scoped>

</style>
