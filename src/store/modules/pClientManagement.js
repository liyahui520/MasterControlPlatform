import { getPsysListBykey } from '@/api/psyslist' 
import {getListData} from '@/utils/index'

const state = { 
}

const mutations = { 
}

const actions = {
  // get user info
  selectBranIdByOrgId({ commit  }) {
    return new Promise((resolve, reject) => { 
      selectBranIdByOrgId().then(response => {
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
