import request from '@/utils/request'

/**
 * 
 * @param {下发药品} data 
 */
export function HqPMedicines(data) {
  return request({
    url: '/hq/HqPMedicines',
    method: 'post',
    data
  })
}

/**
 * 
 * @param {下发供应商} data 
 */
export function HqPProviders(data) {
    return request({
      url: '/hq/HqPProviders',
      method: 'post',
      data
    })
  }

  /**
 * 
 * @param {下发生产商} data 
 */
export function manufacturerHq(data) {
    return request({
      url: '/hq/manufacturerHq',
      method: 'post',
      data
    })
  }

  /**
 * 
 * @param {下发单位或目录} data 
 * @param {[0：单位  1：目录]} status
 * @param {0：停用  1：转移到待分类} isDelete
 */
export function psyslistHq(data) {
    return request({
      url: '/hq/psyslistHq',
      method: 'post',
      data
    })
  }