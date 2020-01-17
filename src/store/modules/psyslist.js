import { getPsysListBykey } from '@/api/psyslist'
import router, { resetRouter } from '@/router'
import {getListData} from '@/utils/index'

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
        var list = getListData(data, { id: 'id', pid: 'parentid', children: 'children', lable: 'name' }) 
        resolve(list)
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
