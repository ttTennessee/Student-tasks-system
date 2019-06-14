<template>
  <div>
    <el-table
      :data="studentAllTeam"
      style="width: 100%"
      @row-click="getDetails">
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
        <template  slot-scope="scope">
          <el-popover
            placement="right"
            trigger="click">
            <el-table :data="studentInTeam">
              <el-table-column width="100" property="id" label="学号"></el-table-column>
              <el-table-column width="150" property="number" label="姓名"></el-table-column>
            </el-table>
            <el-button slot="reference" type="primary">查看组员</el-button>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        width="180">
        <template  slot-scope="scope">
          <el-popover
            placement="right"
            trigger="click">
            <el-table :data="studentInTeam">
              <el-table-column width="100" property="id" label="作业名"></el-table-column>
              <el-table-column width="150" property="number" label="上传时间"></el-table-column>
            </el-table>
            <el-button slot="reference" type="success">查看作业</el-button>
          </el-popover>
        </template>
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
        studentAllTeam:[],
        visible: false,
        studentInTeam:[],
        id:0
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
      getStudentInTeam(){
        axios.post("/team/getStudentInTeam",this.id)
          .then(res =>{
            this.studentInTeam = res.data.students
          }).catch(err => {
          console.log(err)
        })
      },
      getDetails(row){
        this.id = row.id
        console.log(row)
      },

      beforeCreate(){

      },
    }
  }
</script>

<style scoped>

</style>
