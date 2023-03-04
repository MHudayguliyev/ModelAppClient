export const SET_ITEM = 'SET_ITEM'
export const SET_EDIT_DATA = 'SET_EDIT_DATA'
export const SET_EDIT_MODE = 'SET_EDIT_MODE'
export const CLEAN_ITEM_ON_UPLOAD = 'CLEAN_ITEM_ON_UPLOAD'
export const DELETE_UPLOAD_ITEM = 'DELETE_UPLOAD_ITEM'
export const SET_FILE = 'SET_FILE'
export const SET_IMAGE = 'SET_IMAGE'
export const SET_MODEL_DESC = 'SET_MODEL_DESC'
export const SET_MODEL_PRICE = 'SET_MODEL_PRICE'

export const SET_IMAGE_NAME_TM = 'SET_IMAGE_NAME_TM'
export const SET_IMAGE_NAME_RU = 'SET_IMAGE_NAME_RU'
export const SET_IMAGE_NAME_EN = 'SET_IMAGE_NAME_EN'
export const SET_GO_FULL_SCREEN = 'SET_GO_FULL_SCREEN'



export const setItem = (data: any) => ({
    type: SET_ITEM,
    payload: data
})

export const clearItem = () => ({
    type: CLEAN_ITEM_ON_UPLOAD,
})

export const deleteUploadItem = (data: string) => ({
    type: DELETE_UPLOAD_ITEM,
    payload: data
})  

export const setEditMode = (bool: boolean) => ({
    type: SET_EDIT_MODE,
    payload: bool
})

export const setEditData = (data: any) => ({
    type: SET_EDIT_DATA,
    payload: data
})




export const setFile = (data?: any) => ({
    type: SET_FILE,
    payload: data
})

export const setImage = (data?: any) => ({
    type: SET_IMAGE,
    payload: data
})




export const setModelDesc = (data: any) => ({
    type: SET_MODEL_DESC,
    payload: data
})


export const setModelPrice = (data: any) => ({
    type: SET_MODEL_PRICE,
    payload: data
})

export const setImageNametm = (data: any) => ({
    type: SET_IMAGE_NAME_TM,
    payload: data
})

export const setImageNameru = (data: any) => ({
    type: SET_IMAGE_NAME_RU,
    payload: data
})

export const setImageNameen = (data: any) => ({
    type: SET_IMAGE_NAME_EN,
    payload: data
})

export const setShowDialog = (data: boolean) => ({
    type: SET_GO_FULL_SCREEN,
    payload: data
})