import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
  Spin,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/index'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { useSearchParams } from 'react-router-dom'

const { Option } = Select

const Publish = () => {
  const [form] = Form.useForm()
  const [loadings, setLoadings] = useState(false)
  const [editloading, setEditloading] = useState(false)
  const [params] = useSearchParams()
  const articleId = params.get('id')
  // 获取频道列表
  const { channelStore } = useStore()
  useEffect(() => {
    channelStore.loadChannelList()
  }, [channelStore])
  const onSubmit = async (values) => {
    if (uploading) {
      message.warning("请等待图片上传完成！")
      return
    } else {
      setLoadings(true)
      // 数据的二次处理 重点是处理cover字段
      const { channel_id, content, title, type } = values
      // console.log(fileList)
      const params = {
        channel_id,
        content,
        title,
        type,
        cover: {
          type: type,
          images: fileList.map(item => item.url)
        }
      }
      // console.log(params)
      if (articleId) {
        // 编辑
        const res = await http.put(`/mp/articles/${articleId}?draft=false`, params)
        if (res.message === "OK") {
          message.success('更新成功！')
          form.resetFields()
          setFileList([])
          setLoadings(false)
        } else {
          message.error('更新失败！')
        }
      } else {
        const res = await http.post('/mp/articles?draft=false', params)
        if (res.message === "OK") {
          message.success('发布成功！')
          form.resetFields()
          setFileList([])
          setLoadings(false)
        } else {
          message.error('发布失败！')
        }
      }
    }
  }
  // 存放图片列表
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false)
  // 上传成功回调
  const onUploadChange = info => {
    // console.log(info)
    const fileList = info.fileList.map(file => {
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      return file
    })
    setFileList(fileList)
    // console.log(fileList)
    if (fileList.every(item => item.url)) {
      setUploading(false)
    } else {
      setUploading(true)
    }
  }
  const [imgCount, setImgCount] = useState(1)
  const changeType = e => {
    const count = e.target.value
    setImgCount(count)
  }
  // 回显内容
  useEffect(() => {
    async function getArticle () {
      setEditloading(true)
      const res = await http.get(`/mp/articles/${articleId}`)
      form.setFieldsValue({ ...res.data, type: res.data.cover.type })
      setFileList(res.data.cover.images.map(url => {
        return { url }
      }))
      setEditloading(false)
    }
    if (articleId) {
      getArticle()
    }
  }, [articleId, form])
  return (
    <Spin spinning={editloading} tip="正在努力加载中.....">
      <div className="publish">
        <Card
          title={
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link to="/">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{articleId ? '编辑文章' : '发布文章'}</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 1, content: '' }}
            onFinish={onSubmit}
            form={form}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '请选择文章频道' }]}
            >
              <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                {channelStore.channelList.map(item => {
                  return <Option key={item.id} value={item.id}>{item.name}</Option>
                })}
              </Select>
            </Form.Item>

            <Form.Item label="封面">
              <Form.Item name="type">
                <Radio.Group onChange={changeType}>
                  <Radio value={1}>单图</Radio>
                  <Radio value={3}>三图</Radio>
                  <Radio value={0}>无图</Radio>
                </Radio.Group>
              </Form.Item>
              {imgCount > 0 && (
                <Upload
                  name="image"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList
                  action="http://geek.itheima.net/v1_0/upload"
                  fileList={fileList}
                  onChange={onUploadChange}
                  maxCount={imgCount}
                  multiple={imgCount > 1}
                >
                  <div style={{ marginTop: 8 }}>
                    <PlusOutlined />
                  </div>
                </Upload>
              )}
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
            >
              <ReactQuill
                className="publish-quill"
                theme="snow"
                placeholder="请输入文章内容"
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit" loading={loadings}>
                  {articleId ? '更新文章' : '发布文章'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Spin>
  )
}

export default observer(Publish)