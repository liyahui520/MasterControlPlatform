import request from '@/utils/request'

export function getPsysListBykey(data) {
  return request({
    url: '/PsysList/getPsysListBykey',
    method: 'post',
    data
  })
}

