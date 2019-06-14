<template>
  <div>
    <el-table
      :data="teachers"
      style="width: 100%"
      @row-click="getDetails">
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
            placement="top"
            width="160"
            v-model="visible">
            <p>确定选择这个老师码？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
            </div>
            <el-button slot="reference" type="success" round @click="chooseTeacher">选择</el-button>
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
        name:'',
        visible:false
      }
    },
    computed:{
      teacher(){
        return sessionStorage.getItem("teacher")
      },
      role() {
        return sessionStorage.getItem('role')
      },
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
      chooseTeacher(row) {
        var _this = this
        this.$watch("name",function () {
          if (_this.name !== ''){
            console.log(_this.name)
          } else {
            console.log("null")
          }
        })
        axios.post('/student/chooseTeacher',qs.stringify({
            name:_this.name
          })
        )
          .then(res => {
            console.log(this.name)
            console.log(res)
            alert(res.data.msg)
          })
          .catch(err => {
            console.log(err)
          })
      },
      getDetails(row){
        this.name = row.name
      }
    }
  }
</script>

<style scoped>

</style>
