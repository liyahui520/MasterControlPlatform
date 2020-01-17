/**
 * 机构接口
 */
import request from '@/utils/request'

/**
 * 获取连锁机构信息
 */
export function selectBranIdByOrgId() {
  return request({
    url: '/Pmedicineds/selectBranIdByOrgId',
    method: 'post'
  })
}

