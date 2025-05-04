import { Form, Input, Button, Checkbox } from '@arco-design/web-react'
const FormItem = Form.Item
import './login.css'
import { useState } from 'react'
import { login } from '@/services/login'
//引入用户全局管理状态
import useLoginStore from '@/model/loginStore'

//用户数据的类型参数
export interface User {
  username: string
  password: string
}

const Login = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //解构出来设置用户信息的函数
  const { setUserInfo } = useLoginStore()
  const handleLogin = async () => {
    try {
      const userData = { username, password }
      // 调用后端登录接口，这里假设使用第二张图中的login函数
      const response = await login(userData)
      // 登录成功后的逻辑，比如存储用户信息、跳转页面等
      //   console.log('登录成功', response)
      if (response.code === 200) {
        alert(response.msg)
        // 登录成功后隐藏登录组件
        setIsLoginVisible(false)
        setUserInfo(response.user_info)
      } else {
        alert('用户名或密码错误')
      }
    } catch (error) {
      // 登录失败后的逻辑，比如显示错误信息
      console.error('登录失败', error)
    }
  }
  if (!isLoginVisible) {
    return null
  }
  return (
    <div className='login-container'>
      <Form style={{ width: 600 }} autoComplete='off'>
        <FormItem label='用户名'>
          <Input
            placeholder='请输入你的用户名'
            value={username}
            onChange={value => setUsername(value)}
          />
        </FormItem>
        <FormItem label='密码'>
          <Input
            placeholder='请输入你的密码'
            value={password}
            onChange={value => setPassword(value)}
          />
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
          <Checkbox>记住密码</Checkbox>
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
          <Button type='primary' onClick={handleLogin}>
            登陆
          </Button>
        </FormItem>
      </Form>
    </div>
  )
}

export default Login
