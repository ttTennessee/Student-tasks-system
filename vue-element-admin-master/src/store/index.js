import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

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
  },

  role(role){
    state.permission.role = role
  }
}


const store = new Vuex.Store({
  modules,
  getters,
  state,
  mutations
})

export default store
