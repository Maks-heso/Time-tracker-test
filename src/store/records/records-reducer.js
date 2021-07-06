import { 
    REQUEST_GET_RECORDS,
    SUCCESS_GET_RECORDS,
    ERROR_GET_RECORDS,

    REQUEST_ADD_RECORD,
    SUCCESS_ADD_RECORD,
    ERROR_ADD_RECORD,

    REQUEST_DELETE_RECORD,
    SUCCESS_DELETE_RECORDS,
    ERROR_DELETE_RECORD,

    REQUEST_GET_RECORD,
    SUCCESS_GET_RECORD,
    ERROR_GET_RECORD,
} from '../records/records-actions-type';

const initialState = {
    recordsList: [],
    record: {},
    loading: true,
    error: false,
};

const records = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REQUEST_GET_RECORDS:
            return { ...state, recordsList:[], error: false, loading: true }
        case SUCCESS_GET_RECORDS:
            return { ...state, recordsList: payload, error: false, loading: false }
        case ERROR_GET_RECORDS:
            return { ...state, recordsList: [], error: true, loading: false }
        case REQUEST_ADD_RECORD:
            return { ...state, error: false, loading: true }
        case SUCCESS_ADD_RECORD:
            return { ...state, recordsList: payload, error: true, loading: false }
        case ERROR_ADD_RECORD:
            return { ...state, error: true, loading: false }
        case REQUEST_DELETE_RECORD:
            return { ...state, error: false, loading: true }
        case SUCCESS_DELETE_RECORDS:
            return { ...state, recordsList: payload, error: false, loading: false }
        case ERROR_DELETE_RECORD:
            return { ...state, error: true, loading: false }
        case REQUEST_GET_RECORD:
            return { ...state, record: {}, error: false, loading: true }
        case SUCCESS_GET_RECORD:
            return { ...state, record: payload, error: false, loading: false }
        case ERROR_GET_RECORD:
            return { ...state, error: true, loading: false }
            default:          
        return state;
    }
};

export default records;
