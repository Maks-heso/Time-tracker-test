import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom'

import {
    Input,
    Button,
    Form,
    Select,
    DatePicker,
    PageHeader,
    Popconfirm,
    Tabs,
    notification
} from 'antd';

import { requestGetUsers } from '../../store/users/users-actions';
import { requestCreateRecord } from '../../store/records/records-actions';
import styles from './styles.module.css'

const { Item } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { TabPane } = Tabs;

export const TimerPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(requestGetUsers())
    }, [dispatch]);

    
    const { usersList, loading, error} = useSelector((state) => state.users);
    const [form] = Form.useForm();
    const submitForm = async () => {
        try {
            const values = await form.validateFields();
            const { description, time, user: id } = values;
            const user = usersList.find(i => i.id === id);
            dispatch(
                requestCreateRecord({ user, time, description }, res => {
                    res.ok && form.resetFields();
                })
            );
        } catch (errorInfo) {
            notification.error({
                message: 'All fields are required!',
                description: 'Please fill all fields.'
            });
        }
    };
  
      const handleTabClick = key => {
        history.push(`/${key}`)
      }

    return (
        <>
            <PageHeader
                title="Timer"
                extra={[
                    <Button key="1" onClick={() => history.push('/list')}>Records</Button>
                ]}
            >
            </PageHeader>
            <Tabs  centered  defaultActiveKey="1" onChange={handleTabClick}>
            <TabPane tab="Tracker" key="timer">
            </TabPane>
            <TabPane   tab="List of tracked item" key="list">  
     </TabPane>
     </Tabs>
            <Form form={form} name="timer" layout="vertical" scrollToFirstError={true}>
            <div className={styles.timerWrap}>
                <div className={styles.itemWrap}>
                                <Item label="User" name="user" rules={[{required: true, message: "Please select user!"}]}>
                                    <Select
                                        showSearch
                                        loading={loading}
                                        disabled={loading || error}
                                        style={{ width: 200 }}
                                        placeholder="Select user"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {usersList.map(user => (
                                            <Option
                                                value={user.id}
                                                label={user.id}
                                                key={user.id}
                                            >
                                                {user.username}
                                            </Option>
                                        ))}
                                    </Select>
                                </Item>
                                
                                <Item label="Time" name="time" rules={[{required: true, message: "Please select time range!"}]}>
                                    <RangePicker showTime />
                                </Item>
                                </div>
                                <Item label="Description" name="description" rules={[{required: true, message: "Please input description!"}]}>
                                    <TextArea placeholder="Enter description" autoSize={{ minRows: 2, maxRows: 6  }} onPressEnter={submitForm} />
                                </Item>
                                </div>
                                <Item>
                                    <Popconfirm
                                        placement="rightTop"
                                        title="Are you sure?"
                                        okText="Yes"
                                        cancelText="No"
                                        onConfirm={submitForm}
                                    >
                                        <Button className={styles.submit} type="primary">
                                            Submit
                                        </Button>
                                    </Popconfirm>
                                </Item>
            </Form>
            
        </>
        
    );
}