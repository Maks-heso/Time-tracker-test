import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';

import {
    List,
    Button,
    Result,
    Modal,
    PageHeader,
} from 'antd';

import { requestGetRecords, requestDeleteRecord, requestDeleteRecordById } from '../../store/records/records-actions';
import styles from './styles.module.css'

const { Item } = List;
const { Meta } = Item;
const { confirm } = Modal;
export const RecordsPage = () => {
            const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(requestGetRecords())
    }, [dispatch]);
    const { recordsList } = useSelector((state) => state.records);
    const handleDeleteRecordById = recordId => dispatch(requestDeleteRecordById(recordId));
    const handleDeleteRecord = () => dispatch(requestDeleteRecord())
    const handleConfirmById = (id) => {
        confirm({
            title: 'Are you sure you want to delete this record?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDeleteRecordById(id);
            },
          });
      }

      const handleConfirmAll = () => {
        confirm({
            title: 'Are you sure you want to delete all records?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDeleteRecord();
            },
          });
      }
    console.log(recordsList)
    return (
        <>
            <PageHeader
                title="Records"
            >
            </PageHeader>
            <div className={styles.recordsWrap}>
                        {recordsList.length 
                            ?   
                            <>
                            <List
                                    itemLayout="horizontal"
                                    dataSource={recordsList}
                                    renderItem={item => (
                                    <Item
                                        actions={[ 
                                            <div>         
                                                <Button onClick={() => handleConfirmById(item.id)} type="danger">
                                                    Delete
                                                </Button>
                                            <Button type="primary" onClick={() => history.push(`/item/${item.id}`)}>
                                                Details
                                            </Button>,
                                            </div>   
                                        ]}
                                        >
                                        <Meta
                                            title={<span>{item.user.username}</span>}
                                            description={(item.description.length > 100) ? item.description.substr(0, 99) + '...' : item.description}
                                        />
                                    </Item>
                                    )}
                                />
                                 <Button className={styles.deleteAll} onClick={() => handleConfirmAll()} type="danger">
                                                    Delete All
                                                </Button>
                                    </>
                            :   <Result
                                    status="warning"
                                    title="Results list is empty, try to add one!"
                                    extra={
                                    <Button type="primary" onClick={() => history.push('timer')}>
                                        Go to Timer
                                    </Button>
                                    }
                                />

                        }
</div>
        </>
    );
}