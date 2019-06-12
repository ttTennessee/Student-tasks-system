import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const state = {
  students:{
    student:{ "id": 0, "email": "", "password": "",  "number": "", "name": "", "teamId": 0, "gender": "", "teacherId": 0 },
    teacher:{},
    team:{}
  }
}
const mutations = {
  add(state,response){
    state.students.student = response.data.student
    state.students.teacher = response.data.teacher
    state.students.team = response.data.team

  }
}
const store = new Vuex.Store({
  state,mutations
})
export default store
