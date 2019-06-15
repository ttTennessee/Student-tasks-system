<template>
    <div>
      <el-col :span="8">
        <el-card shadow="hover">
          组号：{{getNumber}}
        </el-card>
      </el-col>
    </div>
</template>

<script>
  import axios from 'axios'
  axios.defaults.withCredentials=true;
  import qs from 'qs'
    export default {
      name: "index",
      data(){
          return {
            team:{},
            students:[]
          }
      },
      computed:{
        getNumber(){
          if (this.team.number){
            return this.team.number
          } else {
            return this.team
          }
        }
      },
      created(){
        this.team = JSON.parse(sessionStorage.getItem("team"))
        if (this.team.id) {
          axios.post('/team/getStudentInTeam',qs.stringify({
            teamId:this.team.id
          }))
            .then(res => {
              this.students = res.data.students
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    }


</script>

<style scoped>

</style>
