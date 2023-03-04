import { InitialStateTypes } from './../Types/CartTypes';
import { AnyAction } from 'redux'
import { INCREMENT, DECREMENT, SET_CART, DELETE_MODEL } from '../actions/CartAction'



const initialState: InitialStateTypes = {
    counter: 0,
    cart:  []
}

const CartReducer = (state = initialState, action: AnyAction) => {
    switch(action.type){
        case INCREMENT: 
            return {
                ...state, 
                counter: state.counter + 1
            }
        case DECREMENT: 
            return {
                ...state,
                counter: state.counter - 1
            } 
        case SET_CART: 
            const { model_guid } = action.payload
            const index = state.cart?.findIndex((x: any) => x.model_guid == model_guid)
            return {
                ...state, 
                cart: index === -1 ? [...state.cart, action.payload] : state.cart  
            }
        case DELETE_MODEL: 
            return {
                ...state, 
                cart: state.cart.filter((item: any) => item.model_guid !== action.payload)
            }
        default: 
            return state        
    }
}

export default CartReducer