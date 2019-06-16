<template>
  <div>
  <el-input type="text" style="width:25%;margin:20px 20px 20px 20px" v-model="studentTeacher" placeholder="请输入老师姓名"></el-input>
  <el-button type="primary" style="width:20%;margin-bottom:30px;margin-top: 20px"
             @click="searchTeacher">搜索老师</el-button>

  <el-table
    :data="teachers"
    style="width: 100%"
    v-if="isShow">
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
      <template  slot-scope="scope">
        <el-popover
          width="160"
          placement="right"
          v-model="visible">
          <p>确定选择？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini"@click="chooseTeacher">确定</el-button>
          </div>
          <el-button slot="reference" type="success" round>选择</el-button>
        </el-popover>
      </template>
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
        teachers:[],
        isShow:false,
        visible:false
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
            if (!res.data.teachers) {
              this.$message("输入的名字不能为空")
            }else {
              console.log(res)
              this.isShow = true
              this.teachers = res.data.teachers
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      chooseTeacher() {
        this.visible = false
        axios.post('/student/chooseTeacher',qs.stringify({
            name:this.$store.state.teacherName
          })
        )
          .then(res => {
            console.log(this.name)
            console.log(res)
            this.$message(res.data.msg)
          })
          .catch(err => {
            console.log(err)
          })
      },
      getDetails(row){
        this.$store.commit("teacherName",row.name)
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
