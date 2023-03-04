import React, { ReactNode, useEffect, useState } from 'react'
import Preloader from '../compLibrary/Preloader'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

import { useNavigate } from '@tanstack/react-location'
import moment  from 'moment'

import { refreshAccessToken } from '../api/services/auth_token'

type AuthmiddlewareProps = {
    children: ReactNode,
    withLayout?: boolean,
 }

const AuthMiddleware = (props: AuthmiddlewareProps) => {
    const {
        children,
        withLayout
     } = props;

     const [loading, setLoading] = useState<boolean>(false)


     const navigate = useNavigate()
     useEffect(() => {
      setLoading(true)
      if (localStorage.getItem('accessTokenCreatedTime')) {
         const now = moment(new Date());
         const end = moment(localStorage.getItem('accessTokenCreatedTime'));
         const duration = moment.duration(now.diff(end));
         const hours = duration.asHours()
         console.log(hours)
         if (hours >= 23) {
            refreshAccessToken().then((err: any) => {
               if (err)
                  navigate({ to: '/login', replace: true })
            })
         }
      } else navigate({ to: '/login', replace: true })
      setLoading(false)
   }, []);

  return (
    <div>
      {
        loading ? <><Preloader /></> 
        :
        withLayout ? 
        <>
        <Navbar />
        {children}
        <Footer />
        </> :
        <>
          {children}
        </>

      }
    </div>
  )
}

export default AuthMiddleware
