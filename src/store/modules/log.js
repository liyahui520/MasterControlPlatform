import { getLogAll } from '@/api/log'
import router, { resetRouter } from '@/router'
import {cleanArray} from '@/utils/index'

const state = {
  logData: [],
  params: {
    currentPage: 1,
    pageSize: 10

  },
  currentPage: 1,
  pageSize: 10
}

const mutations = {
  SET_LOGDATA: (state, logData) => {
    state.logData = logData
  },
  SET_CURRENTPAGE: (state, currentPage) => {
    state.currentPage = currentPage
  },
  SET_PAGESIZE: (state, pageSize) => {
    state.pageSize = pageSize
  }
}

const actions = {
  // get user info
  getLogAll({ commit  },params) {
    return new Promise((resolve, reject) => {
      console.log(params)
      getLogAll(params).then(response => {
        const { data } = response.data
        //TODO 临时处理
        commit('SET_LOGDATA', cleanArray(data))
        console.log(data.list)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
