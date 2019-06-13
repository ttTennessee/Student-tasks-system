<template>
  <div>
  <el-input type="text" style="width:25%;margin:20px 20px 20px 20px" v-model="studentTeacher"></el-input>
  <el-button type="primary" style="width:20%;margin-bottom:30px;margin-top: 20px"
             @click="searchTeacher">搜索老师</el-button>

  <el-table
    :data="teachers"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="250">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="subject"
      label="科目"
      width="180">
    </el-table-column>

    <el-table-column v-if="role==='student'">
      <el-button type="success" round>选择</el-button>
    </el-table-column>
  </el-table>
  </div>
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

    computed:{
      teacher(){
        return sessionStorage.getItem("teacher")
      },
      role() {
        return sessionStorage.getItem('role')
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
            this.teachers = res.data.teachers
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
