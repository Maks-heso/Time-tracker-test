import { REQUEST_GET_USERS, SUCCESS_GET_USERS, ERROR_GET_USERS } from '../users/users-actions'

const initialState = {
  usersList: [],
  loading: true,
  error: false,
}

const users = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case REQUEST_GET_USERS:
      return { ...state, usersList: [], error: false, loading: true }
    case SUCCESS_GET_USERS:
      return { ...state, usersList: payload, error: false, loading: false }
    case ERROR_GET_USERS:
      return { ...state, usersList: [], error: true, loading: false }
    default:
      return state
  }
}

export default users
