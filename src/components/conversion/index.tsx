import React, { useEffect, useState } from 'react'
//引入封装的收缩collpase组件
import { Collapse } from '../collapse/index'
//引入播放声音图标
import Voive from '../../static-assets/voice.svg'
//引入复制图标
import Copy from '../../static-assets/copy.svg'
//引入重新生成图标
import Recreate from '../../static-assets/recreate.svg'
//引入分享图标
import Share from '../../static-assets/share.svg'
//引入更多图标
import DoubaoMore from '../../static-assets/doubao-more.svg'
//引入点赞图标
import Dianzan from '../../static-assets/dianzan.svg'
//引入取消点赞图标
import Quxiaodianzan from '../../static-assets/quxiaodianzan.svg'
//引编辑图标
import HelpWrite from '../../static-assets/helpWrite.svg'
import { Button, Divider, Spin } from '@arco-design/web-react'

interface Conversion {
  content: string
  role: 'user' | 'doubao'
  deepThought?: boolean
  deepThoughtContent?: string
}
interface Props {
  content: Conversion[]
  loading: boolean
}
export const Conversion: React.FC<Props> = ({ content, loading }) => {
  //渲染对话数据的动画效果
  const [currentContent, setCurrentContent] = useState<string>('')
  const cartoon = () => {
    let lastContent = content[content.length - 1].content
    let renderContent = lastContent[0]
    const timer = setInterval(() => {
      const newContent = renderContent + lastContent[renderContent.length]
      setCurrentContent(newContent)
      renderContent = newContent
      if (renderContent.length === lastContent.length) {
        clearInterval(timer)
      }
    }, 100)
    return timer
  }
  useEffect(() => {
    const timer = cartoon()
    return () => {
      clearInterval(timer)
    }
  }, [content])

  return (
    <div style={{ overflow: 'auto', maxHeight: '500px' }}>
      {content.map((a, index) => {
        if (a.role === 'user') {
          return (
            <div className='user-div' key={index}>
              <div className='user'>{a.content}</div>
            </div>
          )
        } else {
          return (
            <div className='doubao' key={index}>
              <div className='doubao-div'>
                {/* 判断是否有deepthought */}
                {a.deepThought ? (
                  <Collapse
                    title='深度思考'
                    content={a.deepThoughtContent || ''}
                  />
                ) : (
                  ''
                )}
                {index === content.length - 1 ? currentContent : a.content}
              </div>
              <div className='doubao-button'>
                <Button
                  id='voice'
                  type='outline'
                  icon={<Voive className='vocie' />}
                  style={{
                    color: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '10px',
                    border: 'none'
                  }}
                ></Button>
                <Button
                  id='copy'
                  type='outline'
                  icon={<Copy className='copy' />}
                  style={{
                    color: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '10px',
                    border: 'none'
                  }}
                ></Button>
                <Button
                  id='recreate'
                  type='outline'
                  icon={<Recreate className='reCreate' />}
                  style={{
                    color: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '10px',
                    border: 'none'
                  }}
                ></Button>
                <Button
                  id='helpWrite'
                  type='outline'
                  icon={<HelpWrite className='helpWrite' />}
                  style={{
                    color: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '10px',
                    border: 'none'
                  }}
                >
                  编辑
                </Button>
                <Button
                  id='share'
                  type='outline'
                  icon={<Share className='share' />}
                  style={{
                    color: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '10px',
                    border: 'none'
                  }}
                >
                  分享
                </Button>
                <Button
                  id='more'
                  type='outline'
                  icon={<DoubaoMore className='more' />}
                  style={{
                    color: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '10px',
                    border: 'none'
                  }}
                ></Button>
                {/* 分割线 */}
                <Divider type='vertical' style={{ height: 30 }} />
                <Button
                  id='dianzan'
                  type='outline'
                  icon={<Dianzan className='dianzan' />}
                  style={{
                    color: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '10px',
                    border: 'none'
                  }}
                ></Button>
                <Button
                  id='quxiaodianzan'
                  type='outline'
                  icon={<Quxiaodianzan className='quxiaodianzan' />}
                  style={{
                    color: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '10px',
                    border: 'none'
                  }}
                ></Button>
              </div>
            </div>
          )
        }
      })}
      {/* 判断是不是加载中 */}
      {loading ? <Spin dot /> : ''}
    </div>
  )
}
