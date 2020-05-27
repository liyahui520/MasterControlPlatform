import { HqPMedicines,HqPProviders,manufacturerHq,psyslistHq,businessTypeHq } from '@/api/hq' 
 

const state = { 
}

const mutations = { 
}

const actions = {
  // get user info
  HqPMedicines({ commit  },params) {
    return new Promise((resolve, reject) => { 
        HqPMedicines(params).then(response => {
        const { data } = response.data   
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  HqPProviders({ commit  },params) {
    return new Promise((resolve, reject) => { 
        HqPProviders(params).then(response => {
        const { data } = response.data   
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  manufacturerHq({ commit  },params) {
    return new Promise((resolve, reject) => { 
        manufacturerHq(params).then(response => {
        const { data } = response.data   
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  psyslistHq({ commit  },params) {
    return new Promise((resolve, reject) => { 
        psyslistHq(params).then(response => {
        const { data } = response.data   
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  businessTypeHq({ commit  },params) {
    return new Promise((resolve, reject) => { 
      businessTypeHq(params).then(response => {
        const { data } = response.data   
        resolve(response)
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
