import { Button } from '@arco-design/web-react'
import React, { useState } from 'react'

//引入视频上传图标
import HandleVideo from '../../static-assets/handleVideo.svg'
//引入比例图标
import Bili from '../../static-assets/bili.svg'

import Send from '../../static-assets/send.svg'
import { useInputValueStore } from '@/model/inputValueStore'

interface Conversion {
  content: string
  role: 'user' | 'doubao'
  deepThought?: boolean
  deepThoughtContent?: string
}
export const HandleVideoButton = () => {
  //解构输入框内容的全局状态
  const { inputValue, setInputValue } = useInputValueStore()
  //定义深度思考的state
  const [deepThought, setDeepThought] = useState<boolean>(false)
  //对话数据的state
  const [conversionValue, setConversionValue] = useState<Conversion[]>([
    // {
    //   content: '1',
    //   role: 'user'
    // },
    // {
    //   content:
    //     '请问你输入“1”是有什么具体的需求呢?比如进行数学计算、解释数字含义、围绕“1”展开创作等,可以补充更多信息，以便我更准确地为你提供服务。 ',
    //   role: 'doubao'
    // }
  ])
  // 点击发送按钮和摁下回车的函数
  const handleSubmit = () => {
    setConversionValue([
      ...conversionValue,
      { content: inputValue, role: 'user' },
      {
        deepThought: deepThought,
        deepThoughtContent: deepThought ? '深度思考' : '',
        content:
          '请问你输入“1”是有什么具体的需求呢?比如进行数学计算、解释数字含义、围绕“1”展开创作等,可以补充更多信息，以便我更准确地为你提供服务。 ',
        role: 'doubao'
      }
    ])
    setInputValue('')
  }
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex' }}>
        {/* 上传视频 */}
        <Button
          id='handleVideo'
          type='outline'
          style={{
            color: 'black',
            backgroundColor: 'transparent',
            borderColor: 'rgba(0, 0, 0, 0.08)',
            borderRadius: '10px'
          }}
          icon={<HandleVideo className='arco-icon arco-icon-custom' />}
        >
          比例图
        </Button>
        {/* 比例 */}
        <Button
          id='bili'
          type='outline'
          style={{
            color: 'black',
            backgroundColor: 'transparent',
            borderColor: 'rgba(0, 0, 0, 0.08)',
            borderRadius: '10px',
            marginLeft: '20px'
          }}
          icon={<Bili className='arco-icon arco-icon-custom' />}
        >
          比例图
        </Button>
      </div>

      <div style={{ display: 'flex' }}>
        {/* 发送 */}
        <Button
          id='send'
          type='primary'
          shape='round'
          disabled={inputValue.length === 0}
          style={{
            color: !inputValue ? 'rgba(0, 0, 0, 0.15)' : 'rgb(0, 87, 255)',
            backgroundColor: inputValue
              ? '#rgb(0, 87, 255)'
              : 'rgba(0, 0, 0, 0.15)'
          }}
          onClick={handleSubmit}
          icon={
            <Send
              className='arco-icon arco-icon-custom'
              style={{ fontSize: 32 }}
            />
          }
        ></Button>
      </div>
    </div>
  )
}
