import {Models} from '../../api/Types/queryReturnTypes/Models'
export type InitialStateTypes = {
    adminData: Models[],
    adminModelsCount: number;
    limit: number,
    page: number
}