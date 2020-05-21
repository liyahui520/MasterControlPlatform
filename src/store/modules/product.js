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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}