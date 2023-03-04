import React, {useEffect, useState, ReactNode} from 'react'
import { useNavigate } from '@tanstack/react-location'

/// comps
import Preloader from '../compLibrary/Preloader'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '@app/Components/Footer/Footer'

type AdminMiddlewareProps = {
    children: ReactNode,
    withLayout: boolean;
 }

const AdminMiddleware = (props: AdminMiddlewareProps) => {
    const {children, withLayout} = props
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const value = localStorage.getItem('User')
        const user = value ? JSON.parse(value) : {}
        const token = user ? user.access_token : ''
        const is_admin = user ? user.admin : ''

        setLoading(true)
        if(token == undefined && is_admin == undefined){
            console.log('hello')
            navigate({ to: '/login', replace: true })
        }else if(token && !is_admin){
            console.log('hello')
            navigate({ to: '/free', replace: true })
        }
        setLoading(false)

    }, [])

    return (
       <div>
         {
            loading ? <Preloader /> :
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

export default AdminMiddleware