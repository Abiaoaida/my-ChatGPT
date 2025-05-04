import React from 'react'
import './Skill.css'
//引入Button组件
import { Button } from '@arco-design/web-react'
//引入全局管理状态store
import { useStore } from '../../../model/store'
//引入ai编程图标
import AiProgramming from '../../../static-assets/ai-program.svg'
//引入帮我写作图标
import HelpWrite from '../../../static-assets/helpWrite.svg'
//引入图像生成图标
import PictureCreate from '../../../static-assets/picture-create.svg'
//引入ai搜索图标
import AiSearch from '../../../static-assets/ai-Search.svg'
//引入ai阅读图标
import AiReading from '../../../static-assets/ai-reading.svg'
//引入视频生成图标
import VideoCreate from '../../../static-assets/video-create.svg'

export default function Skill () {
  //从全局管理状态中解构出setCurrentSkill函数
  const { setCurrentSkill, setShowButton } = useStore()
  return (
    <div className='skill-Buttons-area'>
      {/* 技能 */}
      <Button
        className=' ai-programming-Button'
        type='outline'
        shape='round'
        icon={<AiProgramming style={{ color: 'rgb(255, 149, 0)' }} />}
        onClick={() => {
          setCurrentSkill('ai-programming')
          setShowButton(true)
        }}
      >
        AI编程
      </Button>

      <Button
        className=' help-write-Button'
        type='outline'
        shape='round'
        icon={<HelpWrite style={{ color: 'rgb(47, 188, 82)' }} />}
        onClick={() => {
          setCurrentSkill('help-write')
          setShowButton(true)
        }}
      >
        帮我写作
      </Button>

      <Button
        className=' picture-create-Button'
        type='outline'
        shape='round'
        icon={<PictureCreate style={{ color: 'rgb(255, 149, 0)' }} />}
        onClick={() => {
          setCurrentSkill('picture-create')
          setShowButton(true)
        }}
      >
        图像生成
      </Button>
      <Button
        className='ai-search-Button'
        type='outline'
        shape='round'
        icon={<AiSearch style={{ color: 'rgb(0, 87, 255)' }} />}
        onClick={() => {
          setCurrentSkill('ai-search')
          setShowButton(true)
        }}
      >
        AI搜索
      </Button>
      <Button
        className='ai-reading-Button'
        type='outline'
        shape='round'
        icon={<AiReading style={{ color: 'rgb(255, 59, 48)' }} />}
        onClick={() => {
          setCurrentSkill('ai-reading')
          setShowButton(true)
        }}
      >
        AI阅读
      </Button>
      <Button
        className='video-create-Button'
        type='outline'
        shape='round'
        icon={<VideoCreate style={{ color: ' rgb(255, 59, 48)' }} />}
        onClick={() => {
          setCurrentSkill('video-create')
          setShowButton(true)
        }}
      >
        视频生成
      </Button>
    </div>
  )
}
