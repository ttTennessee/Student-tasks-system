<template>
  <div>
    <el-table
      :data="studentAllTeam"
      style="width: 100%"
      @row-click="getDetails">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="number"
        label="组号"
        width="250">
      </el-table-column>
      <el-table-column
      width="180px">
        <template  slot-scope="scope">
          <el-popover
            placement="right"
            trigger="click">
            <el-table :data="studentInTeam">
              <el-table-column width="100" property="number" label="学号"></el-table-column>
              <el-table-column width="150" property="name" label="姓名"></el-table-column>
            </el-table>
            <el-button slot="reference" type="primary" @click="getStudentInTeam(scope.row)">查看组员</el-button>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        width="180">
        <template  slot-scope="scope">
          <el-popover
            placement="right"
            trigger="click">
            <el-table :data="tasks">
              <el-table-column width="200" property="name" label="作业名"></el-table-column>
              <el-table-column width="250" property="updateTime" label="上传时间"></el-table-column>
            </el-table>
            <el-button slot="reference" type="success" @click="getTasks">查看作业</el-button>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        v-if="role === 'student'"
        width="180px">
        <el-button type="info">加入小组</el-button>
      </el-table-column>

    </el-table>

  </div>

</template>

<script>
  import axios from 'axios'
  axios.defaults.withCredentials=true;
  import qs from 'qs'
  export default {
    name: 'index',
    data(){
      return {
        studentTeam:'',
        studentAllTeam:[],
        visible: false,
        studentInTeam:[],
        tasks:[],
        id:0,
        team:{},
        isMember:false,
        isTasks:false
      }
    },
    computed:{
      student(){
        return sessionStorage.getItem("student")
      },
      teacher(){
        return sessionStorage.getItem("teacher")
      },
      role(){
        return sessionStorage.getItem("role")
      }
    },
    created:function(){
      this.team = JSON.parse(sessionStorage.getItem("team"))
      axios.get('/team/getAll')
        .then(res => {
          console.log(res)
          this.studentAllTeam = res.data.teams
        })
        .catch(err => {
          console.log(err)
        })
    },

    methods:{
      selectTeam() {
        axios.post('/team/selectTeam',qs.stringify({
            number:this.studentTeam
          })
        )
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },
      getStudentInTeam(row){

      },
      getDetails(row){
        this.id = row.id
        if (this.isMember){
          this.isMember = false
            axios.post("/team/getStudentInTeam", qs.stringify({
              teamId: this.id
            }))
              .then(res => {
                console.log(res)
                this.studentInTeam = res.data.students
              }).catch(err => {
              console.log(err)
            })
        } else if(this.isTasks){
          this.isTasks = false
          axios.post("/tasks/teamTasks",qs.stringify({
            teamId: this.id
          }))
            .then(res =>{
              console.log(res)
              this.tasks = res.data.tasks
            }).catch(err => {
            console.log(err)
          })
        }else {

        }
      },
      getTasks(){
        this.isTasks = true
      },
      beforeCreate(){

      },
    }
  }
</script>

<style scoped>

</style>
