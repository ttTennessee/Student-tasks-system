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
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'index',
    data(){
      return {
        studentTeam:'',
        studentCreateTeam:'',
        studentAllTeam:'',
      }
    },
    computed:{
      student(){
        return this.$store.state.students.student
      },
      teacher(){
        return this.$store.state.students.teacher
      },
      team(){
        return this.$store.state.students.team
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
