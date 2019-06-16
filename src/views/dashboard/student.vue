<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="个人信息" name="1" style="padding-left: 30px">
          <el-table
            :data="student"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="number"
              label="学号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别"
              width="180">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              width="180">
            </el-table-column>
            <el-table-column
              prop="role"
              label="职务"
              width="180">
            </el-table-column>
          </el-table>
      </el-collapse-item>
      <el-collapse-item title="老师信息" name="2" style="padding-left: 30px">
        <el-table
          :data="teacher"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>

          <el-table-column
            prop="email"
            label="邮箱"
            width="180">
          </el-table-column>
          <el-table-column
            prop="subject"
            label="科目"
            width="180">
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="小组信息" name="3" style="padding-left: 30px">
        <el-table
          :data="team"
          style="width: 100%">
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
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
    export default {
      name: "student",
      data() {
        return {
          activeNames: ['1'],
          student: [],
          teacher: [],
          team: [],
          studentInTeam:{}
        };
      },
      computed:{

      },
      methods: {
        handleChange(val) {
          console.log(val);
        }
      },
      created() {
          this.student=JSON.parse('['+sessionStorage.getItem("student")+']')
          this.teacher=JSON.parse('['+sessionStorage.getItem("teacher")+']')
          this.team=JSON.parse('['+sessionStorage.getItem("team")+']')
      }
    }
</script>

<style scoped>

</style>
