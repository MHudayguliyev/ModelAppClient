import {get} from '../services/auth_helper'
import CategoryTypes from '../Types/queryReturnTypes/Categories'
import {Models, ModelsList} from '../Types/queryReturnTypes/Models'
import { ModelFormatTypes } from '../Types/queryReturnTypes/ModelFormat'
import ModelClassesType from '../Types/queryReturnTypes/ModelClasses'


export const GlobalSearch = (search: string | number | any, route: string): Promise<any> => {
    return get(`free/search?search=${search}&route=${route}`)
}

export const GetCategories = (): Promise<CategoryTypes[]> => {
    return get<CategoryTypes[]>(`free/categories`)
}

export const GetModels = (page: number, limit: number, parentGuid: string, modelGuid: string): Promise<ModelsList | any> => {
    return get<ModelsList | any>(`free/models?page=${page-1}&limit=${limit}&parent_guid=${parentGuid}&model_guid=${modelGuid}`)
}

// export const GetModelsByCategotories = (guid: string, page: number, limit: number): Promise<Models[]> => {
//     return get<Models[]>(`free/models-by-category?parent_guid=${guid}&page=${page-1}&limit=${limit}`)
// }

export const GetSelectedModel = (modelGuid: string): Promise<Models | any> => {
    return get(`free/selected-model/${modelGuid}`)
}
// export const GetRecommendationModels = (modelGuid: string, categoryGuid: string): Promise<Models[]> => {
//     return get(`free/recomendation-models/${modelGuid}/${categoryGuid}`)
// }

export const GetModelFormats = (): Promise<ModelFormatTypes[] | any[]> => {
    return get<ModelFormatTypes[] | any[]>('/upload/model-formats')
}

export const GetModelClasses = (): Promise<ModelClassesType[] | any[]> => {
    return get<ModelClassesType[] | any[]>('/upload/model-classes')
}

/// getters for admin side
export const GetAdminModels = (page: number, limit: number): Promise<Models[] | ModelsList | any> => {
    return get(`/admin/admin-models?page=${page - 1}&limit=${limit}`)
}