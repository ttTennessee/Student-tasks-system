<template>
  <div>
    <el-table
      :data="item.tasks"
      stripe
      style="width: 100%"
      v-for="item in tasks">
      <el-table-column
        prop="name"
        label="项目名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="url"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="上传时间"
        width="280">
      </el-table-column>
      <el-table-column
        width="130">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            width="430"
            trigger="click">
            <template>
              <el-table
                :data="teamMem"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="ID"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="number"
                  label="学号"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="120">
                </el-table-column>
              </el-table>
            </template>
            <el-button slot="reference" @click="TeamMem(scope.row)">小组成员</el-button>
          </el-popover>

        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="success" @click="Run(scope.row)">运行</el-button>
        </template>
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
        tasks:[],
        isClick:false,
        teamMem:[]
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
      getDetails(row){
        if (this.isClick) {
          window.open(row.url, '_blank')
          this.isClick = false
        }
      },
      Run(row){
        window.open(row.url,'_blank')
      },
      TeamMem(row){
        axios.post('/team/getStudentInTeam',qs.stringify({
          teamId:row.teamId
        })).then(res =>{
          this.teamMem = res.data.students
        })
      }

    },
    beforeCreate(){
      axios.post('/tasks/AllTask')
        .then(res => {
          if (res.data.msg){
            this.$message(res.data.msg)
          }else {
            this.tasks = res.data.tasks
            console.log(this.tasks)
          }
        })
        .catch(err =>{
          console.log(err)
        })
    },

  }
</script>

<style scoped>

</style>
