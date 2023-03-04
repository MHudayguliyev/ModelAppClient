export const SET_ADMIN_DATA = 'SET_ADMIN_DATA'
export const SET_ADMIN_MODELS_COUNT = 'SET_ADMIN_MODELS_COUNT'
export const SET_LIMIT = 'SET_LIMIT'
export const SET_PAGE = 'SET_PAGE'
export const DELETE_ADMIN_DATA = 'DELETE_ADMIN_DATA'

import {Models} from '../../api/Types/queryReturnTypes/Models'

export const setAdminData = (data: Models[]) => ({
    type: SET_ADMIN_DATA,
    payload: data
})

export const setAdminModelsCount = (modelsCount: number) => ({
    type: SET_ADMIN_MODELS_COUNT,
    payload: modelsCount
})

export const setLimit = (limit: number) => ({
    type: SET_LIMIT,
    payload: limit
})
export const setPage = (page: number) => ({
    type: SET_PAGE,
    payload: page
})

export const deleteAdminData = (id: string) => ({
    type: DELETE_ADMIN_DATA,
    payload: id
})