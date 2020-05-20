import request from '@/utils/request'

export function getBusinessTypeList(data) {
  return request({
    url: '/BusinessType/getList',
    method: 'post',
    data
  })
}

export function insertBusinessType(data) {
  return request({
    url: '/BusinessType/insertInfo',
    method: 'post',
    data
  })
}

export function updateBusinessType(data) {
  return request({
    url: '/BusinessType/updateInfo',
    method: 'post',
    data
  })
}


export function getBusinessTypeInfo(data) {
  return request({
    url: '/BusinessType/getInfo',
    method: 'post',
    data
  })
}
