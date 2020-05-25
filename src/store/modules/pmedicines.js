import { getPmedicinesByDrugType,getPmedicinesInfo,getUsageMethods,getMedicateMethods } from '@/api/pmedicines' 
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
  },
  getPmedicinesInfo({ commit  },params) {
    return new Promise((resolve, reject) => { 
      getPmedicinesInfo(params).then(response => {
        // const { data } = response   
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUsageMethods({ commit  },params) {
    return new Promise((resolve, reject) => { 
      getUsageMethods(params).then(response => {  
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getMedicateMethods({ commit  },params) {
    return new Promise((resolve, reject) => { 
      getMedicateMethods(params).then(response => {  
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
