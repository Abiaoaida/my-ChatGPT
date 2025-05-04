import React from 'react'
import './ChatSection.css'
import Header from './Header/Header'
import { InputComponents } from '../right/Input/Input'
import Skill from './Skill/Skill'
//引用useEffect
import { useEffect } from 'react'
//引入全局状态管理useStore
import { useStore } from '../../model/store'
import { chat } from '@/services/chat'

export default function ChatSection () {
  const { setWelcome } = useStore()
  //使用useEffect更新欢迎语
  useEffect(() => {
    setWelcome('你好，我有什么可以帮你的？')
  }, [])

  return (
    <div>
      {/* 顶部的导航栏 */}
      <Header />
      <div className='chat-section-container'>
        {/* 中间的问候语和输入框 */}
        <InputComponents />
        {/* 底部的技能区 */}
        <Skill />
      </div>
    </div>
  )
}
