import React, { useEffect } from 'react'
//引入css
import './Header.css'
//引入头像和头像背景
import { Avatar, Button } from '@arco-design/web-react'
import { IconUser } from '@arco-design/web-react/icon'
//引入更新图标
import Update from '../../../static-assets/update.svg'
import { useState } from 'react'
import Login from '@/components/login/login'

export default function Header () {
  //定义登陆的页面是否显示的状态
  const [isLogin, setIsLogin] = useState<boolean>(false)
  //点击头像登录的函数
  const handleLogin = () => {
    setIsLogin(!isLogin)
  }
  useEffect(() => {}, [isLogin])

  return (
    <div className='title'>
      <Update style={{ fontSize: '18px' }} />
      <Avatar size={24} style={{ backgroundColor: '#3370ff' }}>
        <Button style={{ backgroundColor: 'transparent' }}>
          <IconUser onClick={handleLogin} fontSize={50} />
        </Button>
      </Avatar>
      {isLogin && <Login />}
    </div>
  )
}
