<template>
  <div>
    <el-input type="text" style="width:25%;margin:20px 20px 20px 20px" v-model="studentTeam" placeholder="请输入组号"></el-input>
    <el-button type="primary" style="width:20%;margin-bottom:30px;margin-top: 20px"
               @click="searchTeam">搜索小组</el-button>

    <el-table
      :data="studentAllTeam"
      style="width: 100%"
      v-show="isShow"
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
              <el-table-column width="100" property="id" label="学号"></el-table-column>
              <el-table-column width="150" property="number" label="姓名"></el-table-column>
            </el-table>
            <el-button slot="reference" type="primary" @click="getStudentInTeam">查看组员</el-button>
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
        width="180">
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
        isShow: false,
        studentAllTeam:[],
        studentTeam:'',
        studentInTeam:[],
        tasks:[],
        id:0,
        team:{}
      }
    },
    created:function(){
      this.team = JSON.parse(sessionStorage.getItem("team"))
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
    methods:{

      searchTeam() {
        axios.post('/team/searchTeam',qs.stringify({
            number:this.studentTeam
          })
        )
          .then(res => {
            this.studentAllTeam = res.data.teams
            console.log(res)
            this.isShow = true
            // alert(res.data.msg)
          })
          .catch(err => {
            console.log(err)
          })
      },
      selectTeam() {
        axios.post('/team/selectTeam',qs.stringify({
            number:this.studentTeam
          })
        )
          .then(res => {
            console.log(res)
            alert(res.data.msg)
          })
          .catch(err => {
            console.log(err)
          })
      },
      getStudentInTeam(){
        if (this.team.id) {
          console.log(this.team.id)
          axios.post("/team/getStudentInTeam", qs.stringify({
            teamId: this.team.id
          }))
            .then(res => {
              console.log(res)
              this.studentInTeam = res.data.students
            }).catch(err => {
            console.log(err)
          })
        }else {
          this.$message(this.team.msg)
        }
      },
      getDetails(row){
        this.$store.commit("teamId",row.id)
      },
      getTasks(){
        axios.post("/tasks/teamTasks",qs.stringify({
          teamId: this.team.id
        }))
          .then(res =>{
            console.log(res)
            this.tasks = res.data.tasks
          }).catch(err => {
          console.log(err)
        })
      },
    }
  }
</script>

<style scoped>

</style>
