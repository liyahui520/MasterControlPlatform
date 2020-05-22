import { getProductList,getProductInfo,insertProductInfo,updateProductInfo } from '@/api/product'

const state = { 
}

const mutations = { 
}

const actions = {
  getProductList({ commit  },params) {
    return new Promise((resolve, reject) => { 
      getProductList(params).then(response => {
        const { data } =response;
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getProductInfo({ commit  },params) {
    return new Promise((resolve, reject) => { 
      getProductInfo(params).then(response => {
        // const { data } = response
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  insertProductInfo({ commit  },params) {
    return new Promise((resolve, reject) => { 
      insertProductInfo(params).then(response => {
        // const { data } = response
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateProductInfo({ commit  },params) {
    return new Promise((resolve, reject) => { 
      updateProductInfo(params).then(response => {
        // const { data } = response
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