import React from 'react'
import './index.css'
import { Typography } from '@arco-design/web-react'
//引入箭头图标
import { IconDown, IconUp } from '@arco-design/web-react/icon'

const { Paragraph } = Typography
//定义对象
interface Obj {
  title: string
  content: string
}
export const Collapse: React.FC<Obj> = ({ title, content }) => {
  //定义shrink函数
  const shrink = () => {
    setIsShrink(!isShrink)
  }
  //定义isShrink函数
  const [isShrink, setIsShrink] = React.useState(false)
  return (
    <div>
      <div className='collapse-title' onClick={shrink}>
        {title}
        {isShrink ? <IconUp /> : <IconDown />}
      </div>
      <div
        className='collapse-content'
        style={{
          display: isShrink ? 'none' : 'block'
        }}
      >
        <Typography>
          <Paragraph style={{ color: 'rgba(0, 0, 0, 0.5) ' }} blockquote>
            {content}
          </Paragraph>
        </Typography>
      </div>
    </div>
  )
}
