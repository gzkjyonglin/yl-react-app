import { Card, message } from 'antd'
import { Form, Input, Button, Checkbox } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import { useStore } from '../../store/index'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
function Login () {
  const { loginStore } = useStore()
  const navigate = useNavigate()
  const [loadings, setLoadings] = useState(false)
  async function onFinish (values) {
    if (values.remember === false) {
      message.warning('请同意并勾选用户协议和隐私条款！')
    } else {
      setLoadings(true)
      await loginStore.login({
        mobile: values.mobile,
        code: values.code
      })
      if (loginStore.token) {
        setLoadings(false)
        navigate('/', { replace: true })
        message.success('登录成功！')
      } else {
        setLoadings(false)
        message.error('请检查账号密码是否正确！')
      }
    }
  }
  return <div className="login">
    <Card className="login-container">
      <img className="login-logo" src={logo} alt="" />
      {/* 登录表单 */}
      <Form validateTrigger={['onBlur', 'onChange']} onFinish={onFinish} initialValues={{
        mobile: '13911111111',
        code: '246810',
        remember: true
      }}>
        <Form.Item
          name="mobile"
          rules={[
            {
              pattern: /^1[3-9]\d{9}$/,
              message: '手机号码格式不对',
              validateTrigger: 'onBlur'
            },
            { required: true, message: '请输入手机号' }
          ]}>
          <Input size="large" placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="code"
          rules={[
            { len: 6, message: '密码为6个字符', validateTrigger: 'onBlur' },
            { required: true, message: '请输入密码' }
          ]}>
          <Input size="large" placeholder="请输入密码" maxLength={6} type="password" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox className="login-checkbox-label">
            我已阅读并同意「用户协议」和「隐私条款」
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={loadings}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </div>
}
export default Login