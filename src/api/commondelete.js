import request from '@/utils/request'

export function deleteInfo(data) {
  return request({
    url: '/BatchDelete/index',
    method: 'post',
    data
  })
}


