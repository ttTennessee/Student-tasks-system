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

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-search"></i>
                <span>查看老师</span>
              </template>
              <el-menu-item-group>
                <template slot="title"></template>
                <el-menu-item index="/teacher/allTeacher">所有老师</el-menu-item>
                <el-menu-item index="/teacher/search">查询老师</el-menu-item>
                <el-menu-item index="/teacher/select">选择老师</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-news"></i>
                <span>小组管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title"></template>
                <el-menu-item index="/team/allTeam">查看小组</el-menu-item>
                <el-menu-item index="/team/search">查找小组</el-menu-item>
                <el-menu-item index="/team/select">选择小组</el-menu-item>
                <el-menu-item index="/team/create">创建小组</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          <el-submenu index="3">

            <template slot="title">
              <i class="el-icon-bell"></i>
              <span>作业管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="/tasks/all">查看作业</el-menu-item>
              <el-menu-item index="/tasks/upload">上传作业</el-menu-item>
              <el-menu-item index="/tasks/delete">删除作业</el-menu-item>
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
      'sidebar'
    ]),
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
