import { getPsysListBykey } from '@/api/unit'

const state = { 
}

const mutations = { 
}

const actions = {
  // get user info
  getPsysListBykey({ commit  },params) {
    return new Promise((resolve, reject) => { 
        getPsysListBykey(params).then(response => {
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
