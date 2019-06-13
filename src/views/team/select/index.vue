<template>
  <div>
    <el-input type="text" style="width:25%;margin:20px 20px 20px 20px" v-model="studentTeam"></el-input>
    <el-button type="primary" style="width:20%;margin-bottom:30px;margin-top: 20px"
               @click="selectTeam">选择小组</el-button>
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
        studentAllTeam:'',
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
      }
    },
    methods:{
      logouttt(){
        axios.get('/student/logout')
          .then(res => {
            console.log(res)
            this.$router.push('login')
          })
          .catch(err => {
            console.log(err)
          })
      },
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
            alert(res.data.msg)
          })
          .catch(err => {
            console.log(err)
          })
      },
      createTeam(){
        axios.post('/team/createTeam',qs.stringify({
          number:this.studentCreateTeam
        }))
          .then(res=>{
            console.log(res)
            alert(res.data.msg)
          })
          .catch(err => {
            console.log(err)
          })
      },
      getTeam(){
        axios.get('team/getAll')
          .then(res => {
            console.log(res)
            this.studentAllTeam = res.data.teams
          })
          .catch(err => {
            console.log(err)
          })
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleChange(file, fileList) {
        console.log(file, fileList);
        if(!file.response){
          this.uploadUrl = ""
        }else{
          console.log(file.response.task.url)
          this.uploadUrl = file.response.task.url
        }
      },
    }
  }
</script>

<style scoped>

</style>
