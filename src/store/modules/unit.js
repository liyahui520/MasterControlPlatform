import { getUnitList,insertUnitInfo,updateUnitInfo,getUnitInfo } from '@/api/unit'

const state = { 
}

const mutations = { 
}

const actions = {
  // get user info
  getUnitList({ commit  },params) {
    return new Promise((resolve, reject) => { 
      getUnitList(params).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  insertUnitInfo({ commit  },params) {
    return new Promise((resolve, reject) => { 
      insertUnitInfo(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateUnitInfo({ commit  },params) {
    return new Promise((resolve, reject) => { 
      updateUnitInfo(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUnitInfo({ commit  },params) {
    return new Promise((resolve, reject) => { 
      getUnitInfo(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteUnitInfo({ commit  },params) {
    return new Promise((resolve, reject) => { 
      deleteUnitInfo(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
