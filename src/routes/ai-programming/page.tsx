import React from 'react'
//引用useEffect
import { useEffect } from 'react'
//引入全局状态管理useStore
import { useStore } from '../../model/store'
//引用useMemo来切换模式
import { useMemo } from 'react'
//引入header
import Header from '../../components/right/Header/Header'
//引入input
import { InputComponents } from '../../components/right/Input/Input'

export default function page () {
  //从全局状态管理中解构出来更新欢迎语的函数
  const { setWelcome, setWelcomeContent, currentSkill, setCurrentSkill } =
    useStore()
  //使用useEffect更新欢迎语
  useEffect(() => {
    setWelcome('AI 编程')
    setWelcomeContent('秒懂代码，仓库学习，应用创作')
    setCurrentSkill('ai-programming')
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
