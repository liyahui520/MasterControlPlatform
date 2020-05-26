
import request from '@/utils/request'

export function getSupplierList(data) {
  return request({
    url: '/PProvider/getList',
    method: 'post',
    data
  })
}

export function getSupplierInfo(data) {
  return request({
    url: '/PProvider/getInfo',
    method: 'post',
    data
  })
}

export function insertSupplierInfo(data) {
  return request({
    url: '/PProvider/insertInfo',
    method: 'post',
    data
  })
}

export function deleteSupplierInfo(data) {
  return request({
    url: '/PProvider/getList',
    method: 'post',
    data
  })
}


export function updateSupplierInfo(data) {
  return request({
    url: '/PProvider/updateInfo',
    method: 'post',
    data
  })
}


export function barchFullSupplier(data) {
  return request({
    url: '/hq/HqPProviders',
    method: 'post',
    data
  })
}
