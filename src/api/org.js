import request from '@/utils/request'

export function selectBranIdByOrgId() {
  return request({
    url: '/PClientManagement/selectBranIdByOrgId',
    method: 'post'
  })
}
export function selectBtOrgId() {
  return request({
    url: '/PClientManagement/selectBtOrgId',
    method: 'post'
  })
}

