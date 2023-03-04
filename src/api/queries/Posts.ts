import {put, post, deleter} from '../services/auth_helper'
import {ObjectType, SaveChangesType} from '../Types/queryReturnTypes/UploadObject'

export const uploadImage = async (data: any, config: any, obj: ObjectType) => {
    return post(`upload/file?object=${JSON.stringify(obj)}`, data, config)
}

export const saveChanges = async (data: any, config: {}, obj: SaveChangesType) => {
    return post(`admin/save-changes?object=${JSON.stringify(obj)}`, data, config)
}

export const uploadModel = async (modelGuid: string) => {
    return put(`admin/upload-model/${modelGuid}`)
}

export const deleteUnacceptedModel = async (guid: string) => {
    return deleter(`admin/delete-unaccepted-model/${guid}`)
}