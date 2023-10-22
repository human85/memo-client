import './index.scss'
import AddButton from '@/components/AddButton'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import TodoItem from './TodoItem'
import { getTodosApi, deleteTodoApi, patchOrPostTodoApi } from '@/api/todos'
import { useState, useEffect, useCallback } from 'react'
import { CapsuleTabs, Popup, TextArea } from 'antd-mobile'
import { useRef } from 'react'
import { flushSync } from 'react-dom'
import { useMemo } from 'react'

export function Component() {
  const [todos, setTodos] = useState([])

  // 获取 todos
  useEffect(() => {
    async function getTodos() {
      const res = await getTodosApi()
      if (ignore) return
      setTodos(res)
    }

    let ignore = false
    getTodos()

    return () => (ignore = true)
  }, [])

  const [visibility, setVisibility] = useState('all') // 控制标签卡分类切换
  // 分类后的 todos
  const filteredTodos = useMemo(() => {
    switch (visibility) {
      case 'completed':
        return todos.filter(todo => todo.completed)
      case 'active':
        return todos.filter(todo => !todo.completed)
      default:
        return todos
    }
  }, [todos, visibility])

  /**
   * @description 修改 todo 状态
   * @param {boolean} checked 新的 todo 状态
   * @param {number} id todo id
   */
  const toggleState = useCallback(
    async (checked, id) => {
      await patchOrPostTodoApi(id, {
        completed: checked
      })

      setTodos(
        todos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: checked
            }
          }
          return todo
        })
      )
    },
    [todos]
  )

  // 删除 todo
  const removeTodo = useCallback(
    async id => {
      await deleteTodoApi(id)
      setTodos(todos.filter(todo => todo.id !== id))
    },
    [todos]
  )

  const [popupVisible, setPopupVisible] = useState(false) // 控制弹出层显隐
  const [text, setText] = useState('') // 文本域内容
  const textAreaRef = useRef() // 获取弹出层文本域 ref 引用
  const [currentId, setCurrentId] = useState(null)

  // 修改或新增 todo
  function editTodo(id) {
    // 弹出层弹出后立即同步更新 DOM 否则无法获取文本域 ref
    flushSync(() => {
      setPopupVisible(true)
      if (!id) return // 新增时无需执行后续逻辑
      setCurrentId(id)
    })

    textAreaRef.current.focus() // 文本域获取焦点

    if (!id) return // 新增时无需执行后续逻辑
    setText(todos.find(todo => todo.id === id).title) // 放在文本域获取焦点之后防止首次加载光标出现在文字之前
  }

  // 完成编辑 todo
  async function doneEdit() {
    // 修改时内容为空走删除逻辑
    if (!text) {
      if (currentId) {
        await removeTodo(currentId)
      }
      setCurrentId(null) // 重置当前编辑的 todo id
      setPopupVisible(false) // 关闭弹出层
      return
    }

    await patchOrPostTodoApi(currentId, {
      title: text,
      completed: false
    })
    if (currentId) {
      // 修改
      setTodos(
        todos.map(todo => {
          if (todo.id === currentId) {
            return {
              ...todo,
              title: text
            }
          }
          return todo
        })
      )
    } else {
      // 新增需要重新获取 todos，因为 id 由后端生成
      const res = await getTodosApi()
      setTodos(res)
    }
    setText('') // 退出时清空文本域内容
    setCurrentId(null) // 重置当前编辑的 todo id
    setPopupVisible(false) // 关闭弹出层
  }

  return (
    <div className="todos">
      {/* 分类选项卡 */}
      <CapsuleTabs activeKey={visibility} onChange={key => setVisibility(key)}>
        <CapsuleTabs.Tab title="全部" key="all" />
        <CapsuleTabs.Tab title="进行中" key="active" />
        <CapsuleTabs.Tab title="已完成" key="completed" />
      </CapsuleTabs>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleState={toggleState} removeTodo={removeTodo} onClick={editTodo} />
        ))}
      </ul>

      {/*  */}
      <Popup
        visible={popupVisible}
        onMaskClick={doneEdit}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          minHeight: '20vh'
        }}
        className="popup"
      >
        <TextArea
          ref={textAreaRef}
          placeholder="请输入待办事项"
          autoSize={true}
          value={text}
          onChange={val => setText(val)}
        />
      </Popup>

      {/* 回到顶部按钮 */}
      <ScrollToTopButton color="#1677ff" fontSize={30} />

      {/* 新增按钮 */}
      <AddButton color="#1677ff" fontSize={30} onClick={() => editTodo()} />
    </div>
  )
}

Component.displayName = 'Todos'
