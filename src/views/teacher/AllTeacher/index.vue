<template>
  <div>
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
        width="180">
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
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
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
      }
    },

    created:function(){
      axios.post('/student/getAllTeachers')
        .then(res => {
          this.teachers = res.data.teachers
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
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

      }
    }
  }
</script>

<style scoped>

</style>
