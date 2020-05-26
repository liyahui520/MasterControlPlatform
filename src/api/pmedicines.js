/**
 * 产品管理
 */
import request from '@/utils/request'

/**
 * 获取产品信息
 * @param {
  "currentPage": 1,
  "pageSize": 10,
  "params": {
    "barCode": "string",
    "canOrder": 0,
    "canSell": 0,
    "category": 0,
    "deleted": 0,
    "drugType": 1046,
    "drugsName": "string",
    "endTime": "2020-01-16T02:49:12.455Z",
    "id": 0,
    "itemCode": "string",
    "manufacturer": 0,
    "orgId": 0,
    "providerId": 0,
    "startTime": "2020-01-16T02:49:12.455Z",
    "usingMethod": 0
  }
} data 
 */
export function getPmedicinesByDrugType(data) {
  return request({
    url: '/Pmedicineds/getPmedicinesByDrugType',
    method: 'post',
    data
  })
}

//获取药品详细信息
export function getPmedicinesInfo(data) {
  return request({
    url: '/Pmedicineds/getInfo',
    method: 'post',
    data
  })
}
//获取使用方式
export function getUsageMethods(data) {
  return request({
    url: '/SysCategory/getList',
    method: 'post',
    data
  })
}


//获取投药方式
export function getMedicateMethods(data) {
  return request({
    url: '/SysCategory/getList',
    method: 'post',
    data
  })
}

//新增药品信息
export function insertDrugsAPI(data) {
  return request({
    url: '/Pmedicineds/insertInfo',
    method: 'post',
    data
  })
}