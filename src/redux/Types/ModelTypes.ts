import {Models} from '../../api/Types/queryReturnTypes/Models'

export type InitialStateTypes = {
    freeModels: Models[];
    modelsCount: number,
    page: number,
    limit: number,
    categoryGuid: string,
    categoryFocus: string,
    searchValue: string | number
} 