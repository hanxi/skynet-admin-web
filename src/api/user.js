import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function setPassword(data) {
  return request({
    url: '/user/setpassword',
    method: 'post',
    data
  })
}

export function getList() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function delUser(data) {
  return request({
    url: '/user/del',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}