import { deleteInfo } from '@/api/commondelete'

const state = { 
}

const mutations = { 
}

const actions = {
  deleteInfo({ commit  },params) {
    return new Promise((resolve, reject) => { 
        deleteInfo(params).then(response => {
        resolve(response.data)
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