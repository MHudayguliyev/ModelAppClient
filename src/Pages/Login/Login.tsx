import React from 'react'
import {useState, useEffect} from 'react'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import * as yup from 'yup';
import moment from 'moment'
import { useNavigate } from '@tanstack/react-location'
import { useTranslation } from 'react-i18next';
import {axiosInstance} from '../../api/axiosInstance'
import axios from 'axios'

import toast from 'react-hot-toast'

import logo from '../../assets/login.png'
import styles from './Login.module.scss'


interface formikValues {
  username: string,
  password: string  
}

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const mutation = useMutation(data => axiosInstance.post('/auth/login', data))
  const navigate = useNavigate()
  const {t} = useTranslation()


  const formik = useFormik<formikValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string()
         .min(3, `${t('username')}`)
         .required(`${t('requiredField')}`),
      password: yup.string()
         .min(3, `${t('password')}`)
         .required(`${t('requiredField')}`)
   }),
    onSubmit: async (values: any, { resetForm }) => {
      try {
        const res = await mutation.mutateAsync(values)
        if(res.data.refresh_token){
          console.log(res.data)
          toast.success('Successfully logged in!')
          localStorage.setItem('User', JSON.stringify({
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
            user: res.data.data.user_email,
            admin: res.data.data.is_admin
          }))

          localStorage.setItem('accessTokenCreatedTime', moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
        }
        
        navigate({ to: '/free', replace: true })
        window.location.reload()
        resetForm()
      } catch (error: any) {
        if(axios.isAxiosError(error)){
         console.log(error)
         if(error.response){
          if(error.response.data) {
            if(error.response.data.error){
              toast.error(`${error.response.data.error.message}`)
            }else {
              toast.error(`${error.response.data}`)
            }
          }else {
            toast.error(`${error.response}`)
          }
         }else {
          toast(`${error}`)
         }
        }
      }
    }
  })

  
  return (
    <>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.container}>
          <div className={styles.header}>
            <img src={logo} alt='person-image' className={styles.person}/>
          </div>

          <div className={styles.body}>
            <div className={styles.username}>
              <input type='search' autoComplete='off' onChange={formik.handleChange} className={styles.inputValue} name='username'/>
              {formik.touched.username && formik.errors.username ? 
                  <div className={styles.requiredField}>{formik.errors.username}</div> : 
                  null
              }
            </div>
            
            <div className={styles.password}>
              <input type='password' autoComplete='off' onChange={formik.handleChange}  className={styles.inputValue} name='password'/>
              {formik.touched.password && formik.errors.password ? 
                  <div className={styles.requiredField}>{formik.errors.password}</div> : 
                  null
              }
            </div>

            <button type='submit' className={styles.loginBtn}>Login</button>
          </div>
        </div>
      </form>
    </>
  
  )
}

export default Login





{/* <div className={styles.modal}>
      <form className={styles.modalContent} onSubmit={formik.handleSubmit}>
        <div className={styles.modalBody}>
          <div className={styles.imageContainer}>
            <img src={logo} alt='person-image' className={styles.avatar} height='300'/>
          </div>

          
          <div className={styles.container}>
            <label htmlFor={styles.uname}><b>Username</b></label>
            <input type="text" placeholder="Enter Username" className={styles.username} onChange={formik.handleChange} name="username" />
            {formik.touched.username && formik.errors.username ? 
              <span className={styles.requiredField}>{formik.errors.username}</span> : 
              null
            }
            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" className={styles.password} onChange={formik.handleChange} name="password"    />
            {formik.touched.password && formik.errors.password ? 
              <span className={styles.requiredField}>{formik.errors.password}</span> : 
              null
            }
            <button type="submit" className={styles.loginBtn} onClick={() => setShowPassword(!showPassword)}>Login</button>
          </div>
        </div>
      </form>
  </div> */}