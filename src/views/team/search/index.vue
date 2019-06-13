<template>
  <div>
    <el-input type="text" style="width:25%;margin:20px 20px 20px 20px" v-model="studentTeam"></el-input>
    <el-button type="primary" style="width:20%;margin-bottom:30px;margin-top: 20px"
               @click="searchTeam">搜索小组</el-button>

    <el-table
      :data="studentAllTeam"
      style="width: 100%"
      v-show="isShow">
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
        width="180">
        <el-button type="primary">查看组员</el-button>
      </el-table-column>

      <el-table-column
        width="180">
        <el-button type="success">查看作业</el-button>
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
        studentTeam:''
      }
    },
    computed:{
      student(){
        return sessionStorage.getItem("student")
      },
      teacher(){
        return sessionStorage.getItem("teacher")
      },
      team(){
        return sessionStorage.getItem("team")
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
    }
  }
</script>

<style scoped>

</style>
