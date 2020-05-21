import request from '@/utils/request'

export function getUnitList(data) {
  return request({
    url: '/PSysList/getList',
    method: 'post',
    data
  })
}

export function insertUnitInfo(data) {
  return request({
    url: '/PSysList/insertInfo',
    method: 'post',
    data
  })
}

export function updateUnitInfo(data) {
  return request({
    url: '/PSysList/updateInfo',
    method: 'post',
    data
  })
}


export function getUnitInfo(data) {
  return request({
    url: '/PSysList/getInfo',
    method: 'post',
    data
  })
}


export function deleteUnitInfo(data) {
  return request({
    url: '/PSysList/deleteInfo',
    method: 'post',
    data
  })
}