import MemoItem from './MemoItem'
import AddButton from '@/components/AddButton'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { getMemosApi } from '@/api/memos'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Memos() {
  const [memos, setMemos] = useState([])
  const navigate = useNavigate()

  // 获取 memos
  useEffect(() => {
    async function getMemos() {
      const res = await getMemosApi()
      if (ignore) return
      setMemos(res)
    }

    let ignore = false
    getMemos()

    return () => (ignore = true)
  }, [])

  async function refetchMemos() {
    const res = await getMemosApi()
    setMemos(res)
  }

  return (
    <div className="memos">
      <ul className="memo-list">
        {memos.map(item => (
          <MemoItem key={item.id} {...item} refetchMemos={refetchMemos} />
        ))}
      </ul>

      {/* 回到顶部按钮 */}
      <ScrollToTopButton color="#1677ff" fontSize={30} />

      {/* 新增按钮 */}
      <AddButton color="#1677ff" fontSize={30} onClick={() => navigate('/memo')} />
    </div>
  )
}

export default Memos
