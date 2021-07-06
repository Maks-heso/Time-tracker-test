import { notification } from 'antd';

import { getUsers } from '../../configAPI';

export const REQUEST_GET_USERS = 'REQUEST_GET_USERS';
export const SUCCESS_GET_USERS = 'SUCCESS_GET_USERS';
export const ERROR_GET_USERS = 'ERROR_GET_USERS';

export const requestGetUsers = () => async dispatch => {
    dispatch({ type: REQUEST_GET_USERS })
    try {
        const res = await getUsers();
        dispatch({ type: SUCCESS_GET_USERS, payload: res.data })
    } catch (err) {
        dispatch({ type: ERROR_GET_USERS }, err);
        notification.error({
            message: 'Oops!!!',
            description: 'An error occurred while processing your request.'
        })
    }
}
