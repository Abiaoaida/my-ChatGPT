//layout是公共的组件
import React from 'react'
import { Outlet, useNavigate } from '@modern-js/runtime/router'
import { Button, Menu, Tooltip } from '@arco-design/web-react'
const MenuItem = Menu.Item
//引入收起侧边栏的图标
import Sidebar from '../static-assets/sidebar.svg'
//引入+图标
import NewConversion from '../static-assets/newConversion.svg'
//引入ai搜索图标
import AiSearch from '../static-assets/ai-Search.svg'
//引入帮我写作图标
import HelpWrite from '../static-assets/helpWrite.svg'
//引入ai编程图标
import AiProgramming from '../static-assets/ai-program.svg'
//引入图像生成图标
import PictureCreate from '../static-assets/picture-create.svg'
//引入更多图标
import More from '../static-assets/more.svg'
//引入ai云盘
import AiCloud from '../static-assets/ai-Cloud.svg'

const App = () => {
  //引入路由的操作函数
  const navigate = useNavigate()
  return (
    <div className='menu-demo'>
      <Menu
        className='menu'
        hasCollapseButton
        defaultOpenKeys={['0']}
        defaultSelectedKeys={['0_1']}
        //点击那个菜单就跳转到哪个菜单对应的路由上
        onClickMenuItem={key => {
          navigate(key)
        }}
      >
        <div className='menu-header'>
          <div className='menu-header-left'>
            <img
              className='menu-icon'
              src='https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/samantha/logo-icon-white-bg.png'
            ></img>
            <span className='menu-title'>豆包</span>
          </div>
          <Tooltip position='right' trigger='hover' content='收起侧边栏'>
            <Button
              id='sidebar'
              type='outline'
              shape='circle'
              icon={<Sidebar className='arco-icon arco-icon-custom' />}
            ></Button>
          </Tooltip>
        </div>

        <MenuItem key='/' className='menu-item-first'>
          <NewConversion className='arco-icon arco-icon-first arco-icon-custom' />
          新对话
        </MenuItem>

        <MenuItem className='menu-item' key='/ai-search'>
          <AiSearch className='arco-icon arco-icon-custom' />
          Ai搜索
        </MenuItem>

        <MenuItem className='menu-item' key='/help-write'>
          <HelpWrite className='arco-icon arco-icon-custom' />
          帮我写作
        </MenuItem>

        <MenuItem className='menu-item' key='/ai-programming'>
          <AiProgramming className='arco-icon arco-icon-custom' />
          Ai编程
        </MenuItem>

        <MenuItem className='menu-item' key='picture-create'>
          <PictureCreate className='arco-icon arco-icon-custom' /> 图像生成
        </MenuItem>

        <MenuItem className='menu-item' key='0_4'>
          <More className='arco-icon arco-icon-custom' /> 更多
        </MenuItem>

        <hr />

        <MenuItem className='menu-item' key='0_5'>
          <AiCloud className='arco-icon arco-icon-custom' /> Ai云盘
        </MenuItem>

        <hr />

        <MenuItem className='menu-item arco-icon-custom' key='0_6'>
          <Button>历史记录</Button>
        </MenuItem>
      </Menu>
      {/* 占位组件，由路由决定渲染那个组件 */}
      <Outlet />
    </div>
  )
}

export default App
