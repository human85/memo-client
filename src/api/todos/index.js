import request from '@/utils/request'

/**
 * @description 获取 todos
 */
export function getTodosApi() {
  return request.get('/todos')
}

/**
 * @description 修改或新增 todo
 * @param {number} id
 * @param {object} data
 */
export function patchOrPostTodoApi(id, data) {
  if (id) {
    return request.patch('/todos/' + id, data)
  } else {
    return request.post('/todos', data)
  }
}

/**
 * @description 删除 todo
 * @param {number} id
 */
export function deleteTodoApi(id) {
  return request.delete('/todos/' + id)
}
