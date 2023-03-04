import {useState} from 'react'


import './Checkout.css'

const Checkout = () => {
  return (
    <div className='checkout-container'>
      <form className='theForm'>
        <input type='text' className='checkout-input-form' placeholder='Your company'/> 
        <input type='text' className='checkout-input-form' placeholder='Your phone number'/> 
        <input type='text' className='checkout-input-form' placeholder='Your password'/> 
        <input type='text' className='checkout-input-form' placeholder='Card number'/> 
        <input type='text' className='checkout-input-form' placeholder='Your password'/> 
        <input type='text' className='checkout-input-form' placeholder='Card number'/> 
    
        <button className='checkout-btn' onClick={(e) => e.preventDefault()}>Submit</button>    
      </form>
    </div>
  )
}

export default Checkout