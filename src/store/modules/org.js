import { selectBranIdByOrgId,selectBtOrgId } from '@/api/org'

const state = { 
}

const mutations = { 
}

const actions = {
  // get user info
  selectBranIdByOrgId() {
    return new Promise((resolve, reject) => { 
        selectBranIdByOrgId().then(response => {
        const { data } = response  
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  selectBtOrgId() {
    return new Promise((resolve, reject) => { 
      selectBtOrgId().then(response => {
        const { data } = response  
        resolve(data)
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
