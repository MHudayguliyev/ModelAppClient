export const INCREMENT = 'INCRMENT'
export const DECREMENT = 'DECREMENT'
export const SET_CART = 'SET_CART'
export const DELETE_MODEL = 'DELETE_MODEL'


export const increaseCounter = () => ({
    type: INCREMENT,
})

export const decreaseCounter = () => ({
    type: DECREMENT
})

export const setCart = (data: any) => ({
    type: SET_CART,
    payload: data
})

export const deleteModel = (data: string) => ({
    type: DELETE_MODEL,
    payload: data
})
