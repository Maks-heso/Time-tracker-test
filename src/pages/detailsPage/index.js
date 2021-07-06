import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Moment from 'react-moment'

import { Spin, Space, Result, Button, PageHeader, Typography, Descriptions } from 'antd'

import { requestGetRecordById } from '../../store/records/records-actions'
import styles from './styles.module.css'

const { Item } = Descriptions
const { Text, Link } = Typography

const Date = ({ date }) => {
  return (
    <Text strong>
      <Moment format='YYYY-MM-DD HH:mm'>{date}</Moment>
    </Text>
  )
}

export const DetailsPage = props => {
  const history = useHistory()
  const {
    match: {
      params: { id },
    },
  } = props
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestGetRecordById(id))
  }, [dispatch, id])
  const { record, loading } = useSelector(state => state.records)
  const { description, time, user } = record

  return (
    <>
      <PageHeader title={'Record: ' + id} onBack={() => history.push('/list')}></PageHeader>
      <div className={styles.detailsWrap}>
        {record.id ? (
          <>
            <Descriptions title='Record Info'>
              <Item label='Id'>
                <Text strong>{user.id}</Text>
              </Item>
              <Item label='Website'>
                <Link href={`https://${user.website}`} target='_blank' strong>
                  {user.website}
                </Link>
              </Item>
              <Item label='Username'>
                <Text strong>{user.username}</Text>
              </Item>
              <Item label='Full name'>
                <Text strong>{user.name}</Text>
              </Item>
              <Item label='Email'>
                <Text strong>{user.email}</Text>
              </Item>
              <Item label='Phone'>
                <Text strong>{user.phone}</Text>
              </Item>

              <Item label='Time end'>
                <Date date={time[0]} />
              </Item>
              <Item label='Time end'>
                <Date date={time[1]} />
              </Item>
            </Descriptions>
            <Descriptions layout='vertical'>
              <Item label='Description' span={1}>
                <Text italic>{description}</Text>
              </Item>
            </Descriptions>
          </>
        ) : loading ? (
          <Space size='middle'>
            <Spin size='large' />
          </Space>
        ) : (
          <Result
            status='warning'
            title='Record you are trying to access is not founds!'
            extra={
              <Button type='primary' onClick={() => history.push('/list')}>
                Go to Records list
              </Button>
            }
          />
        )}
      </div>
    </>
  )
}
