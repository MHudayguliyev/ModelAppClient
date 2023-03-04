import { AnyAction } from 'redux'
import { InitialStateTypes } from '../Types/AdminTypes'

import { 
    SET_ADMIN_DATA,
    SET_ADMIN_MODELS_COUNT,
    SET_LIMIT, SET_PAGE,
    DELETE_ADMIN_DATA
} from '../actions/AdminAction'

const initialState: InitialStateTypes = {
    adminData: [],
    adminModelsCount: 0,
    page: 1,
    limit: 10
}

const AdminReducer = (state = initialState, action: AnyAction) => {
    switch(action.type) {
        case SET_ADMIN_DATA: 
            return {
                ...state, 
                adminData: action.payload
            }
        case SET_ADMIN_MODELS_COUNT: 
            return {
                ...state,
                adminModelsCount: action.payload
            }
        case SET_LIMIT: 
            return {
                ...state, 
                limit: action.payload
            }
        case SET_PAGE: 
            return {
                ...state, 
                page: action.payload
            }
        case DELETE_ADMIN_DATA:
            return {
                ...state, adminData: state.adminData.filter(item => item.model_guid !== action.payload)
            }
        default: 
            return state
    }
}

export default AdminReducer