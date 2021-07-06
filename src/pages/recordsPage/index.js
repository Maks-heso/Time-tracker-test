import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

import {
    List,
    Button,
    Result,
    Popconfirm,
    PageHeader,
} from 'antd';

import { requestGetRecords, requestDeleteRecord, requestDeleteRecordById } from '../../store/records/records-actions';
import styles from './styles.module.css'

const { Item } = List;
const { Meta } = Item;

export const RecordsPage = () => {
            const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(requestGetRecords())
    }, [dispatch]);
    const { recordsList } = useSelector((state) => state.records);
    const handleDeleteRecordById = recordId => dispatch(requestDeleteRecordById(recordId));
    const handleDeleteRecord = () => dispatch(requestDeleteRecord())

    return (
        <>
            <PageHeader
                title="Records"
                extra={[
                    <Button key="1" onClick={() => history.push('/timer')}>Timer</Button>
                ]}
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
                                            <Popconfirm
                                                placement="left"
                                                title="Are you sure?"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => handleDeleteRecordById(item.id)}
                                            >
                                                <Button type="danger">
                                                    Delete
                                                </Button>
                                            </Popconfirm>,
                                            
                                            <Button type="primary" onClick={() => history.push(`/item/${item.id}`)}>
                                                Details
                                            </Button>,
                                        ]}
                                        >
                                        <Meta
                                            title={<span>{item.user.username}</span>}
                                            description={(item.description.length > 100) ? item.description.substr(0, 99) + '...' : item.description}
                                        />
                                    </Item>
                                    )}
                                />
                                 <Button className={styles.deleteAll} onClick={() => handleDeleteRecord()} type="danger">
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