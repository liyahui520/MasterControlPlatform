/**
 * 产品目录分类
 */
import request from '@/utils/request'

/**
 * 获取目录信息
 * @param {"drugType": 1046,
  "id": 0,
  "orgid": 0} data 
 */
export function getPsysListBykey(data) {
  return request({
    url: '/PSysList/getPsysListBykey',
    method: 'post',
    data
  })
}



