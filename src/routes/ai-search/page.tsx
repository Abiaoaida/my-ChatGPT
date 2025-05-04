import React from 'react'
//引入header
import Header from '../../components/right/Header/Header'
//引用useEffect
import { useEffect } from 'react'
//引入全局状态管理useStore
import { useStore } from '../../model/store'
//引入input
import { InputComponents } from '../../components/right/Input/Input'
export default function page () {
  //从全局状态管理中解构出来更新欢迎语的函数
  const { setWelcome, setWelcomeContent } = useStore()
  //使用useEffect更新欢迎语
  useEffect(() => {
    setWelcome('AI 搜索')
    setWelcomeContent('实时资讯，丰富信源，整合搜索')
  }, [])
  return (
    <div>
      <Header />
      <div className='chat-section-container'>
        <InputComponents />
      </div>
    </div>
  )
}
