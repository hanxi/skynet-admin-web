import request from '@/utils/request'

export function getList() {
  return request({
    url: '/cluster/list',
    method: 'get'
  })
}

export function delNode(data) {
  return request({
    url: '/cluster/del',
    method: 'post',
    data
  })
}

export function addNode(data) {
  return request({
    url: '/cluster/add',
    method: 'post',
    data
  })
}

export function updateNode(data) {
  return request({
    url: '/cluster/update',
    method: 'post',
    data
  })
}

export function getDetail(id) {
  return request({
    url: '/cluster/detail/' + id,
    method: 'get'
  })
}

