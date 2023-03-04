import {InitialStateTypes} from '@redux/Types/ModelTypes'

export const setToStorage = (storage: InitialStateTypes | undefined) => {
    if(storage)
        localStorage.setItem('storage', JSON.stringify(storage))
}


export const getFromStorage = (): InitialStateTypes => {
    if(localStorage.getItem('storage') !== null){
        return JSON.parse(localStorage.getItem('storage')!)
    }

    return {
        freeModels: [],
        modelGuid: '',
        currentPage: 1,
        categoryFocus: ''
    }
}