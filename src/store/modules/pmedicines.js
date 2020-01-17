import { getPmedicinesByDrugType } from '@/api/pmedicines' 
import {getListData} from '@/utils/index'

const state = { 
}

const mutations = { 
}

const actions = {
  // get user info
  getPmedicinesByDrugType({ commit  },params) {
    return new Promise((resolve, reject) => { 
      getPmedicinesByDrugType(params).then(response => {
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
