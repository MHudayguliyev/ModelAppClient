import React, {useState} from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
///moment
import moment from 'moment'
// react icons
import {AiOutlineCalendar} from 'react-icons/ai'
import {FaEdit} from 'react-icons/fa'

import basket from '@app/assets/images/bag_basket.png'
import heart from '@app/assets/images/heart-3509.svg'
import heartChecked from '@app/assets/images/heart-431.svg' 
import { IMG_URL, FILE_URL } from '@app/assets/base'

//comps 
import Button from '@compLib/Button/Button'

/// css
import styles from './ModelCard.module.scss'
import { setModelIsLiked } from '@app/redux/actions/ModelAction'
import { Models } from '@app/api/Types/queryReturnTypes/Models'

interface FormatTypes {
    label: string,
    value: string,
}

type ModelCardProps = {
    item: Models,
    isLiked?: boolean,
    categoryId?: string,
    modelId: string,
    image: string,
    zip: string,
    modelName: string,
    date: Date,
    description?: string,
    formats: FormatTypes[],
    onClick: (id: string) => void
    onEdit?: any,
    onDelete?: any,
    onUpload?: any,
    disableUnneccasary?: boolean
    showBtnGroup?: boolean
}

const ModelCard = (props: ModelCardProps) => {
    const {
        item,
        isLiked,
        modelId,
        image,
        zip,
        modelName,
        date,
        description,
        formats,
        onClick,
        onEdit,
        onDelete,
        onUpload,
        showBtnGroup = false,
        disableUnneccasary = false
    } = props

    const dispatch = useDispatch()

  return (
    <div className={styles.eachCard}>
        <div className={styles.headerImage}>
            <img src={`${IMG_URL}${image}`} className={styles.cardImage} onClick={() => !disableUnneccasary &&  onClick(modelId)}/>
            {!disableUnneccasary && <img src={isLiked ? heartChecked : heart} className={styles.like} onClick={() => dispatch(setModelIsLiked(item))}/>}
        </div>

        <div className={styles.modelBody}>
            <div className={styles.modelHeading}>
                <span>{modelName}</span>
                <span className={styles.modelCreateDate}>
                    <i><AiOutlineCalendar /></i>
                    <p>{moment(date).format('DD.MM.YY')}</p>
                </span>
            </div>
            <div className={styles.footer}>
                <div className={styles.formats}>
                    {formats ? formats?.map((format: any, i: number) => (
                        <span className={styles.format} key={i}>{format.label}</span>
                    )) : null}
                </div>
                
                <div className={styles.footerActions}> 
                    <Button rounded color='orange'><a className={styles.download} href={`${FILE_URL}${zip}`} download={true}>Download</a></Button>
                    <img src={basket} className={styles.basketIcon}/>
                </div>
            </div>

            {showBtnGroup && 
            <div className={styles.adminBtns}>
                <div className={styles.mainBtns}>
                    <Button rounded color='orange' onClick={() => onUpload(modelId)}>Upload</Button>
                    <Button rounded color='red' onClick={() => onDelete(modelId)}>Delete</Button>
                </div>
                <div>
                    <Button rounded color='grey'style={{fontSize: '19px'}} onClick={() => onEdit(item)}><FaEdit /></Button>
                </div>

            </div>
            }
        </div>
    </div>
  )
}

export default ModelCard