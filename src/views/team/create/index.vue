<template>
  <div>
    <el-input type="text" style="width:25%;margin:20px 20px 20px 20px" v-model="studentCreateTeam"></el-input>
    <el-button type="primary" style="width:20%;margin-bottom:30px;margin-top: 20px"
               @click="createTeam">创建小组</el-button>
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
        studentCreateTeam:'',
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
      }
    },

    methods:{

      createTeam(){
        axios.post('/team/createTeam',qs.stringify({
          number:this.studentCreateTeam
        }))
          .then(res=>{
            console.log("11111111")
            console.log(res.data.team)
            console.log("11111111")
            console.log(res.data)
            sessionStorage.setItem("team",res.data.team)
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
