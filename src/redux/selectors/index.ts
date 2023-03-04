import { useSelector } from 'react-redux'

export const counter = useSelector((state: any) => state.cartReducer.counter)