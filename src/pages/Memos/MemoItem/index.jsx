import './index.scss'
import { SwipeAction } from 'antd-mobile'
import dayjs from 'dayjs'
import { deleteMemoApi } from '@/api/memos'
import { useNavigate } from 'react-router-dom'

function MemoItem({ id, title, content, date, refetchMemos }) {
  const navigate = useNavigate()
  const rightActions = [
    {
      key: 'delete',
      text: '删除',
      color: 'danger',
      onClick: async () => {
        await deleteMemoApi(id)
        refetchMemos()
      }
    }
  ]

  return (
    <SwipeAction rightActions={rightActions}>
      <li className="memo-item" onClick={() => navigate(`/memo/${id}`)}>
        <h3>{title}</h3>
        <p className="content">{content}</p>
        <p className="time">{dayjs(date).format('YYYY年MM月DD日')}</p>
      </li>
    </SwipeAction>
  )
}

export default MemoItem
