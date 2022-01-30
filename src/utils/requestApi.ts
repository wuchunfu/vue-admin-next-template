import request from '/@/utils/request'

export const getRequest = (url: string, params: object) => {
  return request({
    method: 'get',
    url: url,
    params: params
  })
}

export const getRequestById = (url: string) => {
  return request({
    method: 'get',
    url: url
  })
}

export const postRequest = (url: string, params: object) => {
  return request({
    method: 'post',
    url: url,
    data: params
  })
}

export const putRequest = (url: string, params: object) => {
  return request({
    method: 'put',
    url: url,
    data: params
  })
}

export const deleteRequestById = (url: string) => {
  return request({
    method: 'delete',
    url: url
  })
}

export const uploadFileRequest = (url: string, params: object) => {
  return request({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
