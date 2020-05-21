import request from '@/utils/request'

export function getProductList(data) {
  return request({
    url: '/PProvider/getList',
    method: 'post',
    data
  })
}

