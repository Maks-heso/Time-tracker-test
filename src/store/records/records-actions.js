import { notification } from 'antd'
import { v4 as uuidv4 } from 'uuid'

import {
  RECORDS_STORAGE_KEY,
  REQUEST_ADD_RECORD,
  REQUEST_DELETE_RECORD,
  REQUEST_GET_RECORD,
  REQUEST_GET_RECORDS,
  SUCCESS_ADD_RECORD,
  SUCCESS_DELETE_RECORDS,
  SUCCESS_GET_RECORD,
  SUCCESS_GET_RECORDS,
  ERROR_ADD_RECORD,
  ERROR_DELETE_RECORD,
  ERROR_GET_RECORD,
  ERROR_GET_RECORDS,
} from './records-actions-type'

export const requestGetRecords = () => async dispatch => {
  dispatch({ type: REQUEST_GET_RECORDS })
  try {
    const items = localStorage.getItem(RECORDS_STORAGE_KEY) || []
    dispatch({ type: SUCCESS_GET_RECORDS, payload: JSON.parse(items) })
    return JSON.parse(items)
  } catch (err) {
    dispatch({ type: ERROR_GET_RECORDS }, err)
    notification.error({
      message: 'Oops!!!',
      description: 'An error occurred while processing records list.',
    })
  }
}

export const requestCreateRecord = (data, callback) => async dispatch => {
  dispatch({ type: REQUEST_ADD_RECORD })
  try {
    const records = getRecordsFromStorage()
    const payload = [...records, { ...data, id: uuidv4() }]
    setRecordsToStorage(payload)
    dispatch({ type: SUCCESS_ADD_RECORD, payload })
    callback({ ok: true })

    notification.success({
      message: 'Success!',
      description: 'New record was added successfully',
    })
  } catch (err) {
    dispatch({ type: ERROR_ADD_RECORD }, err)
    callback({ ok: false })

    notification.error({
      message: 'Oops!!!',
      description: 'An error occurred while adding new records.',
    })
  }
}

export const requestDeleteRecord = () => async dispatch => {
  dispatch({ type: REQUEST_DELETE_RECORD })
  try {
    const payload = []
    setRecordsToStorage(payload)
    dispatch({ type: SUCCESS_DELETE_RECORDS, payload })
    notification.success({
      message: 'Success!',
      description: 'Record deleted successfully',
    })
  } catch (err) {
    dispatch({ type: ERROR_DELETE_RECORD }, err)
    notification.error({
      message: 'Oops!!!',
      description: 'An error occurred while deleting new records.',
    })
  }
}

export const requestDeleteRecordById = id => async dispatch => {
  dispatch({ type: REQUEST_DELETE_RECORD })
  try {
    const records = getRecordsFromStorage()
    const payload = records.filter(i => i.id !== id)
    setRecordsToStorage(payload)
    dispatch({ type: SUCCESS_DELETE_RECORDS, payload })
    notification.success({
      message: 'Success!',
      description: 'Record deleted successfully',
    })
  } catch (err) {
    dispatch({ type: ERROR_DELETE_RECORD }, err)
    notification.error({
      message: 'Oops!!!',
      description: 'An error occurred while deleting new records.',
    })
  }
}

export const requestGetRecordById = id => async dispatch => {
  const records = await dispatch(requestGetRecords())
  dispatch({ type: REQUEST_GET_RECORD })

  try {
    const payload = records.find(i => i.id === id) || {}
    dispatch({ type: SUCCESS_GET_RECORD, payload })
  } catch (err) {
    dispatch({ type: ERROR_GET_RECORD }, err)
    notification.error({
      message: 'Oops!!!',
      description: 'An error occurred while processing record.',
    })
  }
}

const getRecordsFromStorage = () => {
  const records = localStorage.getItem(RECORDS_STORAGE_KEY)
  return records ? JSON.parse(records) : []
}

const setRecordsToStorage = payload => {
  localStorage.setItem(RECORDS_STORAGE_KEY, JSON.stringify(payload))
}
