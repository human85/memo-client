import request from '@/utils/request'

/** @description 获取 memos */
export function getMemosApi() {
  return request.get('/memos')
}

/**
 * @description 删除 memo
 * @param {number} id memo id
 */
export function deleteMemoApi(id) {
  return request.delete('/memos/' + id)
}

/**
 * @description 根据 id 获取 memo
 * @param {number} id memo id
 */
export function getMemoByIdApi(id) {
  return request.get('/memos/' + id)
}

/**
 * @description 修改或新增 memo
 * @param {number} id memo id
 * @param {object} data
 */
export function patchOrPostMemoApi(id, data) {
  if (id) {
    return request.patch('/memos/' + id, data)
  } else {
    return request.post('/memos', data)
  }
}
