import {
  getBusinessTypeList,
  insertBusinessType,
  updateBusinessType,
  getBusinessTypeInfo
} from '@/api/businesstype'

const state = {}

const mutations = {}

const actions = {
  // get user info
  getBusinessTypeList({
    commit
  },params) {
    return new Promise((resolve, reject) => {
      getBusinessTypeList(params).then(response => {
        const {
          data
        } = response.data
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  insertBusinessType({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      insertBusinessType(params).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateBusinessType({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      updateBusinessType(params).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getBusinessTypeInfo({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getBusinessTypeInfo(params).then(response => {
        resolve(response.data)
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
