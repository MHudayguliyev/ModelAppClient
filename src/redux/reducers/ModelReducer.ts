import { AnyAction } from 'redux'
import { InitialStateTypes } from '../Types/ModelTypes'
import { isSelectedModel } from '@app/utils/helpers'
import { 
SET_MODELS,
SET_IS_LIKED,
SET_CATEGORY_GUID, 
SET_PAGE, 
SET_LIMIT,
SET_CATEGORY_FOCUS, 
SET_MODEL_COUNT,
SET_SEARCH} from '../actions/ModelAction'



const initialState: InitialStateTypes = {
    freeModels: [],
    modelsCount: 0,
    page: 1,
    limit: 10,
    categoryGuid: '',
    categoryFocus: '',
    searchValue: ''
}

const ModelsReducer = (state = initialState, action: AnyAction) => {
    switch(action.type) {
        case SET_MODELS:
            return {
                ...state, 
                freeModels: action.payload
            }
        case SET_MODEL_COUNT: 
            return {
                ...state, 
                modelsCount: action.payload
            }

        case SET_IS_LIKED: 
            const stateModelsCopy = state.freeModels.map(item => {
                if(isSelectedModel(item, action.payload)){
                    return {...item, is_liked: !item.is_liked}
                }
                    return item
                })

            return {
                ...state,
                freeModels: [...stateModelsCopy]
            }
        case SET_CATEGORY_GUID: 
            return {
                ...state,
                categoryGuid: action.payload
            }
        case SET_PAGE: 
            return {
                ...state, 
                page: action.payload
            }
        case SET_LIMIT: 
            return {
                ...state, 
                limit: action.payload
            }
        case SET_CATEGORY_FOCUS: 
            return {
                ...state, 
                categoryFocus: action.payload
            }
        case SET_SEARCH: 
            return {
                ...state, 
                searchValue: action.payload
            }
        default:
            return state
    }
}

export default ModelsReducer