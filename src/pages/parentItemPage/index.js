import React from 'react'

import { useHistory} from 'react-router-dom'


import {

    Tabs,
    
} from 'antd';




const { TabPane } = Tabs;


export const ParentItemPage = ({children}) => {
    const history = useHistory();
  
      const handleTabClick = key => {
        history.push(`/${key}`)
      }

    return (
        <>
            <Tabs  centered  defaultActiveKey="1" onChange={handleTabClick}>
            <TabPane tab="Tracker" key="timer">
            {children}
            </TabPane>
            <TabPane   tab="List of tracked item" key="list">  
    {children}
     </TabPane>
     </Tabs>
        </>
        
    );
}