import './index.scss'
import { SwipeAction, Checkbox } from 'antd-mobile'
import { memo } from 'react'

const TodoItem = memo(function TodoItem({ id, title, completed, toggleState, removeTodo, onClick }) {
  const rightActions = [
    {
      key: 'delete',
      text: '删除',
      color: 'danger',
      onClick: () => {
        removeTodo(id)
      }
    }
  ]

  return (
    <SwipeAction rightActions={rightActions}>
      <li className="todo-item ">
        <Checkbox checked={completed} onChange={checked => toggleState(checked, id)} />
        <span onClick={() => onClick(id)} className={completed ? 'title completed' : 'title'}>
          {title}
        </span>
      </li>
    </SwipeAction>
  )
})

export default TodoItem
