import {useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import toast from 'react-hot-toast'

import logo from '../../assets/react+ts.png'

///react icons
import {AiOutlineDelete} from 'react-icons/ai'

// translation
import { useTranslation } from 'react-i18next'

// comps
import Checkout from '../../compLibrary/Chechout/Checkout'

/// base 
import {IMG_URL} from '../../assets/base'

// redux actions
import { deleteModel, decreaseCounter } from '../../redux/actions/CartAction'

import './AddToCart.css'
const AddToCart = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const BASE_URL = 'http://localhost:8080/files/'
  const [loading, setLoading] = useState<boolean>(false)

  const data = useSelector((state: any) => state.cartReducer.cart)


  const handleDelete = (id: string) => {
    dispatch(deleteModel(id))
    dispatch(decreaseCounter())
    toast.error(`Model deleted!`, { position: 'bottom-right' })
  }

  return (
    <div className='add-to-cart-container'>
      <div className='product-section'>
        {<div>{t('upload')}</div>}
      {data.length !== 0 &&   
      <table className='theTable'>
        <thead>
            <tr>
              <th>Image</th>
              <th>Model</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
        </thead>
        {data?.map((item: any, i: number) => (
            <tbody key={i}>
              <tr>
                <td><img src={`${IMG_URL}${item.model_img_name}`} width='150' height='80'/></td>
                <td>{item.model_name}</td>
                <td>{item.price_value} TMT</td>
                <td><span className='remove-model-btn' onClick={() => handleDelete(item.model_guid)}><AiOutlineDelete/></span></td>
              </tr>
            </tbody>
          ))}
        </table>}
      </div>

      <div className='checkout-section'>
          <Checkout />
      </div>
    </div>
  )
}

export default AddToCart