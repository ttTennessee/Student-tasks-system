<template>
    
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'SHPStudent',
    data(){
      return {
        fileList:[],
        tasks:[],

      }
    },
    computed:{
      student(){
        return this.$store.state.students.student
      },
      dataUpTasks(){
        return this.tasks
      }
    },
    methods:{
      submitUpload() {
        this.$refs.upload.submit();
        setTimeout(()=>{
          this.getAllTasks()
          console.log('fff')
        },10000)

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
      getAllTasks(){
        axios.post('/tasks/studentGetTasks')
          .then(res => {
            console.log(res)
            this.tasks = res.data.tasks
            console.log(this.tasks)
          })
          .catch(err =>{
            console.log(err)
          })
      },
      deleteTask(event){
        alert('确定删除？')
        axios.post('tasks/delete',qs.stringify({
          taskId:event.target.id
        }))
          .then(res => {
            console.log(res)
            this.getAllTasks()
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    beforeCreate(){
      axios.post('/tasks/studentGetTasks')
        .then(res => {
          console.log(res)
          this.tasks = res.data.tasks
          console.log(this.tasks)
        })
        .catch(err =>{
          console.log(err)
        })
    },

  }
</script>

<style scoped>

</style>
