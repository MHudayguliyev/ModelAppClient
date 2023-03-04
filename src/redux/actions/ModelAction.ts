import {Models, ModelsList} from '../../api/Types/queryReturnTypes/Models'

export const SET_MODELS = 'SET_MODELS'
export const SET_MODEL_COUNT = 'SET_MODEL_COUNT'
export const SET_IS_LIKED = 'SET_IS_LIKED'
export const SET_CATEGORY_GUID = 'SET_CATEGORY_GUID'
export const SET_PAGE = 'SET_PAGE'
export const SET_LIMIT = 'SET_LIMIT'
export const SET_CATEGORY_FOCUS = 'SET_CATEGORY_FOCUS' 
export const SET_SEARCH = 'SET_SEARCH'

export const setFreeModels = (data: Models[]) => ({
    type: SET_MODELS,
    payload: data
})

export const setModelCount = (count: number) => ({
    type: SET_MODEL_COUNT,
    payload: count
})

export const setModelIsLiked = (data: Models) => ({
    type: SET_IS_LIKED,
    payload: data
})

export const setCategoryGuid = (guid: string) => ({
    type: SET_CATEGORY_GUID,
    payload: guid
}) 

export const setPage = (page: number) => ({
    type: SET_PAGE,
    payload: page
})

export const setLimit = (limit: number) => ({
    type: SET_LIMIT,
    payload: limit
})

export const setCategoryFocus = (id: string) => ({
    type: SET_CATEGORY_FOCUS,
    payload: id
})

export const setSearch = (value: string | number) => ({
    type: SET_SEARCH,
    payload: value
})