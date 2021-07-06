import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { Input, Button, Form, Select, DatePicker, PageHeader, Modal, notification } from 'antd'

import { requestGetUsers } from '../../store/users/users-actions'
import { requestCreateRecord } from '../../store/records/records-actions'
import { useHistory } from 'react-router-dom'
import styles from './styles.module.css'

const { Item } = Form
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input
const { confirm } = Modal

export const TimerPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(requestGetUsers())
  }, [dispatch])

  const { usersList, loading, error } = useSelector(state => state.users)
  const [form] = Form.useForm()
  const submitForm = async () => {
    try {
      const values = await form.validateFields()
      const { description, time, user: id } = values
      const user = usersList.find(i => i.id === id)
      dispatch(
        requestCreateRecord({ user, time, description }, res => {
          res.ok && form.resetFields()
        })
      )
    } catch (errorInfo) {
      notification.error({
        message: 'All fields are required!',
        description: 'Please fill all fields.',
      })
    }
  }

  const handleConfirm = () => {
    confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        submitForm()
      },
    })
  }

  return (
    <>
      <PageHeader title='Timer'></PageHeader>
      <Form form={form} name='timer' layout='vertical' scrollToFirstError={true}>
        <div className={styles.timerWrap}>
          <div className={styles.itemWrap}>
            <Item label='User' name='user' rules={[{ required: true, message: 'Please select user!' }]}>
              <Select
                showSearch
                loading={loading}
                disabled={loading || error}
                style={{ width: 200 }}
                placeholder='Select user'
                optionFilterProp='children'
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {usersList.map(user => (
                  <Option value={user.id} label={user.id} key={user.id}>
                    {user.username}
                  </Option>
                ))}
              </Select>
            </Item>

            <Item label='Time' name='time' rules={[{ required: true, message: 'Please select time range!' }]}>
              <RangePicker showTime />
            </Item>
          </div>
          <Item
            label='Description'
            name='description'
            rules={[{ required: true, message: 'Please input description!' }]}>
            <TextArea placeholder='Enter description' autoSize={{ minRows: 2, maxRows: 6 }} onPressEnter={submitForm} />
          </Item>
        </div>
        <Item>
          <Button onClick={handleConfirm} className={styles.submit} type='primary'>
            Submit
          </Button>
        </Item>
      </Form>
    </>
  )
}
