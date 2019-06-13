<template>
    
</template>

<script>
  import axios from 'axios'
  axios.defaults.withCredentials=true;
  import qs from 'qs'
  export default {
    name: 'SHPTeacher',
    data(){
      return {
        studentTeacher:'',
        teachers:[]
      }
    },
    created:{
      student(){
        return sessionStorage.getItem("student")
      },
      teacher(){
        return sessionStorage.getItem("teacher")
      },
      team() {
        return sessionStorage.getItem("team")
      }
    },
    computed:{
      teacher(){
        return sessionStorage.getItem("teacher")
      }
    },
    methods:{
      searchTeacher() {
        axios.post('/student/searchTeacher',qs.stringify({
            name:this.studentTeacher
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
      chooseTeacher() {
        axios.post('/student/chooseTeacher',qs.stringify({
            name:this.studentTeacher
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
      allTeacher(){
        axios.post('/student/getAllTeachers')
          .then(res => {
            this.teachers = res.data.teachers
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
