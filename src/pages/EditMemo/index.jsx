import './index.scss'
import { TextArea } from 'antd-mobile'
import CustomNavBar from '@/components/NavBar'
import { CheckOutline } from 'antd-mobile-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMemoByIdApi, patchOrPostMemoApi } from '@/api/memos'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Toast } from 'antd-mobile'

export function Component() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tips, setTips] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  // 导航栏右侧内容
  const navBarRight = <CheckOutline fontSize={28} onClick={() => saveChanges()} />

  // 获取 memo 信息
  useEffect(() => {
    async function getMemoById() {
      const res = await getMemoByIdApi(id)
      if (ignore) return
      setTitle(res.title)
      setContent(res.content)
    }

    let ignore = false
    if (!id) return // 新增 memo 不需要先获取
    getMemoById()

    return () => (ignore = true)
  }, [id])

  // 修改或新增 memo
  async function saveChanges() {
    await patchOrPostMemoApi(id, { title, content, date: new Date() })
    Toast.show({
      content: '保存成功',
      duration: 1000
    })
    setTips('已保存 ✅')
  }

  // 防止页面闪烁
  if (id && (!title || !content)) return <></>

  return (
    <>
      {/* 导航栏 */}
      <CustomNavBar onBack={() => navigate(-1)} right={navBarRight}>
        <span className="tips">{tips}</span>
      </CustomNavBar>
      <div className="memo">
        {/* 标题 */}
        <TextArea
          className="title"
          placeholder="标题"
          value={title}
          onChange={val => {
            setTitle(val)
            setTips('请保存❌')
          }}
          autoSize={true}
        />

        {/* 主体内容 */}
        <TextArea
          className="content"
          placeholder="请开始书写✍"
          value={content}
          onChange={val => {
            setContent(val)
            setTips('请保存❌')
          }}
          autoSize={true}
          showCount={number => <span className="number-count">{number} 字</span>}
        />
      </div>
    </>
  )
}

Component.displayName = 'EditMemo'
