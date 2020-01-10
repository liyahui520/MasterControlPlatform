import request from '@/utils/request'

/**
 * 
 * @param {获取日志信息} data 
 */
export function getLogAll(data) {
  return request({
    url: '/Log/getLogs',
    method: 'post',
    data
  })
}

