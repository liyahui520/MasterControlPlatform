import {
  getSupplierList,
  getSupplierInfo,
  insertSupplierInfo,
  deleteSupplierInfo,
  updateSupplierInfo
} from '@/api/supplier'

const state = {}

const mutations = {}

const actions = {
  getSupplierList({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getSupplierList(params).then(response => {
        const {
          data
        } = response;
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSupplierInfo({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      getSupplierInfo(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  insertSupplierInfo({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      insertSupplierInfo(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteSupplierInfo({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      deleteSupplierInfo(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateSupplierInfo({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      updateSupplierInfo(params).then(response => {
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
