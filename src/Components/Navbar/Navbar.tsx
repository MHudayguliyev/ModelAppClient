import React from 'react'
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from 'react-query'
import { useNavigate, useMatch, Link } from '@tanstack/react-location'
import {BsCart, BsCartCheck, BsUpload} from 'react-icons/bs'

/// apis
import { GetCategories } from '../../api/queries/Getters'
///css
import styles from './Navbar.module.scss'
/// translation
import { useTranslation } from 'react-i18next'
import languages from '../../assets/jsonData'

// components 
import Search from '../Search/Search'

//react-icons 
import {BsSearch} from 'react-icons/bs'
import {RiGlobalFill} from 'react-icons/ri'

type NavbarProps = {
    data?: any
}

const Navbar = (props: NavbarProps) => {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    const match = useMatch()

    const cart = useSelector((state: any) => state.cartReducer.cart)
    const showDialog = useSelector((state: any) => state.uploadReducer.showDialog)
    const [isShowLocale, setShowLocale] = useState<boolean>(false)

    const {refetch} = useQuery('getCategories', () => GetCategories(), {refetchOnWindowFocus: false})

    const logout = () => {
        localStorage.removeItem('User')
        localStorage.removeItem('accessTokenCreatedTime')
        window.location.reload()
        navigate({ to: '/login', replace: true })
    }

    const toggleLocale = () => {
        setShowLocale(!isShowLocale)
    }

    const ChangeLanguage = (label: string) => {
        i18n.changeLanguage(label)
        localStorage.setItem('language', label)
        refetch()
    }

  return (
    <>
       {!showDialog &&
         <nav className={styles.nav}>
         <ul>
             <div className={styles.pageLists}>
                <li><Link to={'/premium'}>Premium</Link></li>
                <li><Link to={'/free'}>Free</Link></li>
             </div>


             {match.pathname === '/upload-image/' ? null : 
                <div className={styles.logoStuff}>
                    <Search icon={<BsSearch />}/>
                </div>
             }

             <div className={styles.authLists}>
                 <div className={styles.authList}>
                     {match.pathname === '/upload-image/' ? null : <li><span className={styles.uploadBtn} title='uploadFile'><Link to='/upload-image' style={{ color: 'white' }}><BsUpload /></Link></span></li>}
                     <li><span className={styles.cart} title='cart'><Link to='/cart' style={{color: 'white'}}>{cart?.length == 0 ? <BsCart /> : <BsCartCheck />}</Link></span></li>
                     <li onClick={() => toggleLocale()}><span className={styles.localeIcon}><RiGlobalFill /></span></li>
                     <li><a href='' onClick={logout}>{t('logout')}</a></li>
                 </div>

                 <>
                     {isShowLocale && <ul className={styles.languages} >
                         {languages?.map((lang: any, i:number) => (
                             <li key={i} onClick={() => ChangeLanguage(lang.value)}  className={styles.langList}>
                                 <img  src={lang.icon} alt='flag icon' className={styles.langIcon}/>
                                 <span className={styles.langLabel}>{lang.label}</span>
                             </li>
                         ))}
                     </ul>}
                 </>
             </div>
         </ul>
     </nav>
       }
    </>
  )
}

export default Navbar