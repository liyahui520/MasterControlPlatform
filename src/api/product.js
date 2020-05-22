import request from '@/utils/request'

export function getProductList(data) {
  return request({
    url: '/Manufacturer/getList',
    method: 'post',
    data
  })
}


export function getProductInfo(data) {
  return request({
    url: '/Manufacturer/getInfo',
    method: 'post',
    data
  })
}
export function insertProductInfo(data) {
  return request({
    url: '/Manufacturer/insertInfo',
    method: 'post',
    data
  })
}
export function updateProductInfo(data) {
  return request({
    url: '/Manufacturer/updateInfo',
    method: 'post',
    data
  })
}

