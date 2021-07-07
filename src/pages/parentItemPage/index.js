import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Tabs, Result, Button } from 'antd'
import styles from './styles.module.css'

const { TabPane } = Tabs

export const ParentItemPage = ({ children }) => {
  const history = useHistory()
  const [activeTab, setActiveTab] = useState('1')

  const handleTabClick = key => {
    history.push(`/${key}`)
    setActiveTab(key)
  }
  const { recordsList } = useSelector(state => state.records)

  return (
    <>
      <Tabs centered activeKey={activeTab} onChange={handleTabClick}>
        <TabPane tab='Tracker' key='timer'>
          {children}
        </TabPane>
        <TabPane tab='List of tracked item' key='list'>
          {children}
          {!recordsList.length ? (
            <div className={styles.parentWrap}>
              <Result status='warning' title='Results list is empty, try to add one!' />
              <Button
                type='primary'
                onClick={() => {
                  handleTabClick('timer')
                }}>
                Go to Timer
              </Button>
            </div>
          ) : null}
        </TabPane>
      </Tabs>
    </>
  )
}
