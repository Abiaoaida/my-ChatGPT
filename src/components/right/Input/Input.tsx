import React from 'react'
//引入usestate
import { useState } from 'react'
//引入css
import './Input.css'
//引入conversion的组件
import { Conversion } from '../../conversion/index'
//引入全局状态管理
import { useStore } from '../../../model/store'
//引入用户信息的全局状态管理
import useLoginStore from '../../../model/loginStore'
//引用useMemo来切换模式
import { useMemo } from 'react'
//引入useEffect
import { useEffect } from 'react'
//引入input组件
import { Button, Input, Message } from '@arco-design/web-react'
import { AiProgramingButton } from '@/components/inputButton/aiPrograming'
import { HelpWriteButton } from '@/components/inputButton/helpWrite'
import { PictureCreateButton } from '@/components/inputButton/pictureCreate'
import { AiSearchButton } from '@/components/inputButton/aiSearch'
import { AiReadingButton } from '@/components/inputButton/aiReading'
import { HandleVideoButton } from '@/components/inputButton/video-create'
import { NewConversionButton } from '@/components/inputButton/newConversionButton'
import { ai, chat } from '@/services/chat'
import { useInputValueStore } from '@/model/inputValueStore'

//对话数据的类型参数
export interface Conversion {
  content: string
  role: 'user' | 'doubao'
  deepThought?: boolean
  deepThoughtContent?: string
}
export const InputComponents: React.FC = ({}) => {
  //定义一个loading状态
  const [loading, setLoading] = useState<boolean>(false)
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
  const handleSubmit = async () => {
    setLoading(true)
    const newConversionValue: Conversion[] = [
      ...conversionValue,
      { content: inputValue, role: 'user' }
    ]
    setConversionValue(newConversionValue)
    setInputValue('')
    try {
      if (currentSkill === 'ai-programming') {
        const result = await ai(newConversionValue)
        setConversionValue(result.data)
      } else {
        const result = await chat(newConversionValue)
        setConversionValue(result.data)
      }
    } catch (error) {
      Message.error('This is an error message!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  //结构化全局技能状态
  const {
    welcomeContent,
    welcome,
    currentSkill,
    showButton,
    setShowButton,
    setCurrentSkill
  } = useStore()

  //解构用户信息的全局状态
  const { userInfo } = useLoginStore()
  //解构输入框内容的全局状态
  const { inputValue, setInputValue } = useInputValueStore()
  //创建保存当前内容的state,在react渲染周期内是异步执行的
  const [currentContent, setCurrentContent] = useState<string>('')
  //创建一个控制动画效果的函数
  const cartoon = () => {
    //需要用新变量来保存当前内容,因为setCurrentContent是异步的,所以需要用新变量来保存当前内容
    let content = welcome[0]
    const timer = setInterval(() => {
      const newContent = content + welcome[content.length]
      setCurrentContent(newContent)
      content = newContent
      if (content.length === welcome.length) {
        clearInterval(timer)
      }
    }, 100)
    return timer
  }
  //使用useEffect来调用动画效果
  useEffect(() => {
    const timer = cartoon()
    return () => {
      clearInterval(timer)
    }
  }, [welcome])
  //使用useMemo来切换placeholder的内容
  const placeholder = useMemo(() => {
    if (currentSkill === 'ai-programming') {
      return '粘贴代码或描述你的问题'
    } else if (currentSkill === 'help-write') {
      return '输入你要撰写的主题'
    } else if (currentSkill === 'picture-create') {
      return '输入你所想的画面、角色、情绪、场景、风格...'
    } else if (currentSkill === 'ai-search') {
      return '搜索、提问或发消息'
    } else if (currentSkill === 'ai-reading') {
      return '询问关于这篇文章的任何问题'
    } else if (currentSkill === 'video-create') {
      return '添加一张图片,然后描述你所想象的场景'
    } else {
      return '发消息、输入@选择技能或/选择文件'
    }
  }, [currentSkill])
  //useEffect来切换按钮的显示
  const skill = useMemo(() => {
    if (currentSkill === 'ai-programming') {
      return <AiProgramingButton />
    } else if (currentSkill === 'help-write') {
      return <HelpWriteButton />
    } else if (currentSkill === 'picture-create') {
      return <PictureCreateButton />
    } else if (currentSkill === 'ai-search') {
      return <AiSearchButton />
    } else if (currentSkill === 'ai-reading') {
      return <AiReadingButton />
    } else if (currentSkill === 'video-create') {
      return <HandleVideoButton />
    } else {
      return <NewConversionButton />
    }
  }, [currentSkill])
  //使用useMemo来切换back的内容
  const back = useMemo(() => {
    if (currentSkill === 'ai-programming') {
      return 'Ai编程'
    } else if (currentSkill === 'help-write') {
      return '帮我写作'
    } else if (currentSkill === 'picture-create') {
      return '图像生成'
    } else if (currentSkill === 'ai-search') {
      return 'Ai搜索'
    } else if (currentSkill === 'ai-reading') {
      return 'Ai阅读'
    } else if (currentSkill === 'video-create') {
      return '视频生成'
    } else {
      return ''
    }
  }, [currentSkill])

  return (
    <div>
      {/* 问候语 */}
      {conversionValue.length ? (
        <Conversion content={conversionValue} loading={loading} />
      ) : (
        // 根据路由路径显示不同的问候语
        <div>
          <h1 style={{ marginBottom: '28px' }}>
            {userInfo.nickname
              ? `欢迎回来，${userInfo.nickname}!${currentContent}`
              : currentContent}
          </h1>
          {welcomeContent ? (
            <div style={{ color: 'gray', marginBottom: '28px' }}>
              {welcomeContent}
            </div>
          ) : (
            ''
          )}
        </div>
      )}
      {/* 内容区 */}
      <div className='chat-input-area'>
        <div style={{ display: 'flex' }}>
          {/* 依据pre的值决定button出现还是消失 */}
          {showButton ? (
            <Button
              style={{
                backgroundColor: 'rgba(0, 87, 255, 0.06)',
                color: 'rgb(0, 87, 255)',
                borderRadius: '10px',
                border: '1px solid rgb(0, 87, 255)',
                height: '28px'
              }}
              onClick={() => {
                setShowButton(false)
                setCurrentSkill('new-conversion')
              }}
            >
              {back}
            </Button>
          ) : (
            ''
          )}

          <Input.TextArea
            id='chat-input'
            autoSize={true}
            placeholder={placeholder}
            onChange={value => {
              //去除空格和回车的影响
              value = value.replace(/\s/g, '')
              value = value.replace(/\n/g, '')
              setInputValue(value)
            }}
            onKeyDown={value => {
              if (
                value.key === 'Enter' &&
                inputValue.length !== 0 &&
                !loading
              ) {
                handleSubmit()
              }
            }}
            // 输入框的值
            value={inputValue}
          />
        </div>

        {/* 图标和文字 */}
        <div className='button'>
          {/* 技能按钮 */}
          {skill}
        </div>
      </div>
    </div>
  )
}
