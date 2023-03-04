import React from 'react'
import { useNavigate } from '@tanstack/react-location'
import Preloader from '../../compLibrary/Preloader/index'
//// images 
import { IMG_URL, FILE_URL } from '../../assets/base'
import basket from '../../assets/images/bag_basket.png'
import NoDataFound from '../../assets/images/no-data.png'
import { useTranslation } from 'react-i18next'
/// redux
import { useSelector } from 'react-redux'
/// css
import styles from './Models.module.scss'
/// comps
import Pagination from '../../compLibrary/Pagination/Pagination'
///moment
import moment from 'moment'
// react icons
import {AiOutlineCalendar} from 'react-icons/ai'

interface ModelProps {
    pages: number,
    isModelsLoading: any,
    isModelsError: any
    isMbcLoading: any,
    isMbcError: any,
}

const Models = (props: ModelProps) => {
    const changeableModels = useSelector((state: any) => state.modelsReducer.models)
    const navigation = useNavigate()

    const localeValue: string | any = localStorage.getItem('language')
    const {t} = useTranslation()
    const {
        isModelsLoading,
        isModelsError,
        isMbcLoading,
        isMbcError,
        pages
    } = props


    const navigate = (id: string) => {
        navigation({to: `/free/${id}`})
    }


    return (
        <>
            {isModelsLoading || isMbcLoading ? 
                <span className={styles.preloader}><Preloader /></span> : 
                isModelsError || isMbcError ?
                <div className={styles.notFound}>
                    <img src={NoDataFound} className={styles.noModelFoundIcon}/>
                    <span>{t('notFound')}</span>
                </div> : 
                changeableModels.length ? 
                <div className={styles.modelCardSection}>
                    {
                        changeableModels?.map((item: any, index: number) => (
                            <div className={styles.eachCard} key={index} onClick={() => navigate(item.model_guid)}>
                                <div className={styles.headerImage}>
                                    <img src={`${IMG_URL}${item.model_img}`} className={styles.cardImage}/>
                                </div>
                                <div className={styles.modelBody}>
                                    <div className={styles.modelHeading}>
                                        <span>{localeValue !== '' && item.model_names[localeValue] ? item.model_names[localeValue] : item.model_names.tm}</span>
                                        <span className={styles.modelCreateDate}>
                                            <i><AiOutlineCalendar /></i>
                                            <p>{moment(item.crt_date).format('DD.MM.YY')}</p>
                                        </span>
                                    </div>
                                    <div className={styles.flexBody}>
                                        <div className={styles.desc}>{item.desc?.length > 30 ? item.desc.substr(0, 30) + '....' : item.desc}</div>
                                    </div>
                                    <div className={styles.footer}>
                                        <div className={styles.formats}>
                                            {item.formats ? item.formats?.map((format: any, i: number) => (
                                                <span className={styles.format} key={i}>{format.label}</span>
                                            )) : null}
                                        </div>
                                        
                                        <div className={styles.footerActions}>
                                            <span className={styles.downloadModel}><a href={`${FILE_URL}${item.model_zip}`} download={true}>Download</a></span>
                                            <img src={basket} className={styles.basketIcon}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    ))}
                </div> : 
                <div className={styles.notFound}>
                    <img src={NoDataFound} className={styles.noModelFoundIcon}/>
                    <span>{t('notFound')}</span>
                </div>
            }
            <Pagination pages={pages}/>
        </>
    )
}

export default Models;