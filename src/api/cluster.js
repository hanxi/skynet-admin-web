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

export function getDetail(nodename) {
  return request({
    url: '/cluster/detail/' + nodename,
    method: 'get'
  })
}

export function getNodeNames() {
  return request({
    url: '/cluster/nodenames',
    method: 'get'
  })
}

export function reload() {
  return request({
    url: '/cluster/reload',
    method: 'post'
  })
}

