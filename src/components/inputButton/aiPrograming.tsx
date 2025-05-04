import { Button, Divider, Tooltip } from '@arco-design/web-react'
import React, { useState } from 'react'

// 引入深度思考的图标
import DeepThought from '../../static-assets/deep-thought.svg'
//引入link图标
import Link from '../../static-assets/link.svg'
//引入github图标
import Github from '../../static-assets/github.svg'
//引入语音输入图标
import Siri from '../../static-assets/siri.svg'
//引入发送图标
import Send from '../../static-assets/send.svg'
import { start } from 'repl'
import { useInputValueStore } from '@/model/inputValueStore'

interface Conversion {
  content: string
  role: 'user' | 'doubao'
  deepThought?: boolean
  deepThoughtContent?: string
}
export const AiProgramingButton = () => {
  //解构输入框内容的全局状态
  const { inputValue, setInputValue } = useInputValueStore()
  //定义深度思考的state
  const [deepThought, setDeepThought] = useState<boolean>(false)
  //声明语音输入的state
  const [startButton, setStartButton] = useState<boolean>(false)
  //语音输入的处理函数
  const handleVoice = () => {
    setStartButton(true)
    // 检查浏览器是否支持 SpeechRecognition
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      // 设置识别语言为中文
      recognition.lang = 'zh-CN'
      // 监听语音识别结果事件
      //@ts-ignore
      recognition.onresult = (event: any) => {
        let finalTranscript = ''
        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          } else {
            // 处理临时识别结果
            const interimTranscript = event.results[i][0].transcript
            console.log('临时识别结果:', interimTranscript)
          }
        }
        setInputValue(finalTranscript)
      }

      recognition.onend = () => {
        setStartButton(false)
      }

      recognition.onerror = (event: any) => {
        console.error('语音识别错误:', event.error)
      }
      recognition.start()
      // 监听语音识别错误事件
      //@ts-ignore
    } else {
      alert(
        '你的浏览器不支持语音识别功能，请使用支持 Web Speech API 的浏览器。'
      )
    }
  }
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
        <Tooltip position='top' trigger='hover' content='添加文件'>
          <Button
            id='link'
            type='outline'
            icon={<Link className='arco-icon arco-icon-custom' />}
          />
        </Tooltip>
        <Button
          id='github'
          type='outline'
          style={{
            color: 'black',
            backgroundColor: 'transparent',
            borderColor: 'rgba(0, 0, 0, 0.08)',
            borderRadius: '10px',
            marginRight: '20px'
          }}
          icon={<Github className='arco-icon arco-icon-custom' />}
        >
          GitHub仓库
        </Button>
        <Tooltip
          position='top'
          trigger='hover'
          content='开启推理模式，进行深度思考'
        >
          <Button
            id='deep-thought-button'
            type='outline'
            style={{
              height: '32px',
              color: deepThought ? 'rgb(0, 87, 255)' : 'black',
              backgroundColor: deepThought
                ? 'rgb(229, 238, 255)'
                : 'transparent',
              borderColor: deepThought
                ? 'rgb(0, 87, 255)'
                : 'rgba(0, 0, 0, 0.08)'
            }}
            onClick={() => {
              setDeepThought(!deepThought)
            }}
            icon={<DeepThought className='arco-icon arco-icon-custom' />}
          >
            深度思考
          </Button>
        </Tooltip>
      </div>
      <div style={{ display: 'flex' }}>
        <Tooltip position='top' trigger='hover' content='语音输入'>
          <Button
            id='siri'
            type='outline'
            shape='round'
            disabled={startButton}
            onClick={handleVoice}
            style={{ color: 'black', border: 'transparent' }}
            icon={<Siri className='arco-icon arco-icon-custom' />}
          ></Button>
        </Tooltip>
        <Divider type='vertical' style={{ height: 30 }} />
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
