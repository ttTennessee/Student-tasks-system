<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="个人信息" name="1" style="padding-left: 30px">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="老师信息" name="2" style="padding-left: 30px">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="小组信息" name="3" style="padding-left: 30px">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="作业信息" name="4" style="padding-left: 30px">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
    <div style="width:300px;margin:0 auto; padding:20px 0;">
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41142202000035" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
        <img src="@/assets/recordico.png" style="float:left;"/>
        <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">豫公网安备 41142202000035号</p>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
      name: "student",
      data() {
        return {
          activeNames: ['1'],
          student: sessionStorage.getItem("student"),
          teacher: sessionStorage.getItem("teacher"),
          team: sessionStorage.getItem("team"),
        };
      },
      computed:{

      },
      methods: {
        handleChange(val) {
          console.log(val);
        }
      }
    }
</script>

<style scoped>

</style>
