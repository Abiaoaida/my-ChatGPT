import React from 'react'
//引入header
import Header from '../../components/right/Header/Header'
//引入input
import { InputComponents } from '../../components/right/Input/Input'
//引用useEffect
import { useEffect } from 'react'
//引入全局状态管理useStore
import { useStore } from '../../model/store'
export default function page () {
  //从全局状态管理中解构出来更新欢迎语的函数
  const { setWelcome, setWelcomeContent } = useStore()
  //使用useEffect更新欢迎语
  useEffect(() => {
    setWelcome('帮我写作')
    setWelcomeContent('多种体裁，润色校对，一键成文')
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
