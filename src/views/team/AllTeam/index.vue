<template>
  <div>
    <el-table
      :data="studentAllTeam"
      style="width: 100%">
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
        <el-button type="primary">查看组员</el-button>
      </el-table-column>

      <el-table-column
        width="180">
        <el-button type="success">查看作业</el-button>
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
        studentCreateTeam:'',
        studentAllTeam:[],
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
    created:function(){
      axios.get('team/getAll')
        .then(res => {
          console.log(res)
          this.studentAllTeam = res.data.teams
        })
        .catch(err => {
          console.log(err)
        })
    },

    methods:{
      searchTeam() {
        axios.post('/team/searchTeam',qs.stringify({
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
      beforeCreate(){

      },
    }
  }
</script>

<style scoped>

</style>
