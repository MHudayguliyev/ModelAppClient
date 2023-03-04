import { AnyAction } from 'redux';
import {InitialStates} from '../Types/UploadTypes'
import { SET_ITEM, SET_GO_FULL_SCREEN, SET_EDIT_MODE, SET_EDIT_DATA, SET_FILE, SET_IMAGE, SET_MODEL_DESC, SET_MODEL_PRICE, SET_IMAGE_NAME_RU, SET_IMAGE_NAME_TM, SET_IMAGE_NAME_EN} from '../actions/UploadAction'

const initialStates : InitialStates = {
    items: [],
    editData: [],
    editMode: false,
    showDialog: false,
    uploadDetails: {
        file: null, 
        image: null, 
        imageNametm: '',
        imageNameru: '',
        imageNameen: '',
        modelDesc: '',
        modelPrice: ''
    }
}

const UploadReducer = (state = initialStates, action: AnyAction) => {
    switch(action.type){
        case SET_ITEM: 
            return {
                ...state, 
                items: action.payload
            }
        case SET_FILE: 
            return {
                ...state, 
                uploadDetails: {
                   ...state.uploadDetails, 
                   file: action.payload
                }
            }
        case SET_IMAGE: 
            return {
                ...state, 
                uploadDetails: {
                ...state.uploadDetails, 
                image: action.payload
                }
            }

        case SET_IMAGE_NAME_TM: 
            return {
                ...state, 
                uploadDetails: {
                    ...state.uploadDetails,
                    imageNametm: action.payload
                }
            }
        case SET_IMAGE_NAME_RU: 
            return {
                ...state,
                uploadDetails: {
                    ...state.uploadDetails,
                    imageNameru: action.payload
                }
            }
        case SET_IMAGE_NAME_EN: 
            return {
                ...state,
                uploadDetails: {
                    ...state.uploadDetails,
                    imageNameen: action.payload
                }
            }
        case SET_MODEL_DESC: 
            return {
                ...state, 
                uploadDetails: {
                    ...state.uploadDetails, 
                    modelDesc: action.payload
                }
            }
        case SET_MODEL_PRICE: 
            return {
                ...state, 
                uploadDetails: {
                    ...state.uploadDetails,
                    modelPrice: action.payload
                }
            }
        case SET_EDIT_DATA: 
            return {
                ...state, 
                editData: action.payload
            }
        case SET_EDIT_MODE: 
            return {
                ...state, 
                editMode: action.payload
            }
        case SET_GO_FULL_SCREEN:
            return {
                ...state, 
                showDialog: action.payload
            }
        default: 
            return state
    }
}


export default UploadReducer