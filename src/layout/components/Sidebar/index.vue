<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">


        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            default-active="1"
            unique-opened
            router
            background-color="#2d3a4b"
            text-color="#dfe6e9"
            :collapse-transition= "false">

            <el-menu-item index="/student/home" v-if="role==='student'">
              <i class="el-icon-tickets" style="width: 50px"></i>
              <span>主页</span>
            </el-menu-item>
            <el-menu-item index="/teacher/home" v-if="role==='teacher'">
              <i class="el-icon-tickets" style="width: 50px"></i>
              <span>主页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-search" style="width: 50px"></i>
                <span>查看老师</span>
              </template>
              <el-menu-item-group>
                <template slot="title"></template>
                <el-menu-item index="/teacher/allTeacher">所有老师</el-menu-item>
                <el-menu-item index="/teacher/search">查询老师</el-menu-item>
                <el-menu-item index="/teacher/select" v-if="role==='student'">选择老师</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-news" style="width: 50px"></i>
                <span>小组管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title"></template>
                <el-menu-item index="/team/mine" v-if="role==='student'">我的小组</el-menu-item>
                <el-menu-item index="/team/allTeam">查看小组</el-menu-item>
                <el-menu-item index="/team/search">查找小组</el-menu-item>
                <el-menu-item index="/team/select" v-if="role==='student'">选择小组</el-menu-item>
                <el-menu-item index="/team/create" v-if="role==='student'">创建小组</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          <el-submenu index="4">

            <template slot="title">
              <i class="el-icon-bell" style="width: 50px"></i>
              <span>作业管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="/tasks/all">查看作业</el-menu-item>
              <el-menu-item index="/tasks/upload" v-if="role==='student'">上传作业</el-menu-item>
              <el-menu-item index="/tasks/delete" v-if="role==='student'">删除作业</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
      </el-menu>
        </el-scrollbar>


    </el-scrollbar>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {

  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
    ]),
    role() {
      return sessionStorage.getItem('role')
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
