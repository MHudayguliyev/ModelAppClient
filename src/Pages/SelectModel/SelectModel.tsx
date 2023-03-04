import React, {useEffect, useState, useMemo} from 'react'
import { useQuery } from 'react-query'
import { useMatch, useNavigate } from '@tanstack/react-location'
import { useTranslation } from 'react-i18next'
import { GetModels,GetSelectedModel } from '@app/api/queries/Getters'

/// comps
import ModelCard from '@app/Components/ModelCard/ModelCard'
import Preloader from '@compLib/Preloader'
import Row from '@compLib/Grid/Row'
import Col from '@compLib/Grid/Col'

// css
import styles from './SelectModel.module.scss'


import { FILE_URL, IMG_URL } from '@app/assets/base'
import heart from '@app/assets/images/heart-3509.svg'
import heartChecked from '@app/assets/images/heart-431.svg'
import Nodata from '@app/assets/images/no-data.png'
import Button from '@compLib/Button/Button'
import { Models, ModelsList } from '@app/api/Types/queryReturnTypes/Models'



type SelectModelProps = {
  localeValue: string,
}

const SelectModel = (props: SelectModelProps) => {

    const match = useMatch()
    const navigate = useNavigate()
    const {i18n, t} = useTranslation()
    const locale: any = i18n.language

    //states 
    // const [selectedModel, setS]
    const [selectedModel, setSelectedModel] = useState<Models | any>()
    const [isHeartChecked, setHeartChecked] = useState<boolean>(false)

    // queries
    const {
      data: dataSelectedModel,
      isError: isSelectedModelError,
      isLoading: isSelectedModelLoading,
      refetch
    } = useQuery(['getSelectedModel', match.params.modelGuid], 
      () => GetSelectedModel(match.params.modelGuid), 
      {enabled: !!match.params.modelGuid})
      
    const {
      data: modelsData,
      isLoading: isModelsLoading,
      isError: isModelsLoadError,
      refetch: RefetchModels,
    } = useQuery(['getModels', selectedModel?.parent_guid, match.params.modelGuid], 
      ()=> GetModels(1, 8, selectedModel?.parent_guid, match.params.modelGuid), 
      {
        enabled: !!selectedModel?.parent_guid,
      })




      useEffect(() => {
        if(!isSelectedModelLoading || !isSelectedModelError) 
          setSelectedModel(dataSelectedModel)
      }, [isSelectedModelLoading, isSelectedModelError])

      useEffect(() => {
        if(dataSelectedModel)
          setSelectedModel(dataSelectedModel)
      }, [dataSelectedModel])

      useEffect(() => {
        refetch()
      }, [match.params.modelGuid])

      useEffect(() => {
        if(selectedModel)
          RefetchModels()
      }, [selectedModel])

      const Models = useMemo(() => {
        return modelsData?.data?.map((item: any) => ({...item}))
      }, [modelsData])




  return (
    <>
      {isSelectedModelError ? <div className={styles.notFound}>
                                <img src={Nodata} className={styles.noModelFoundIcon}/>
                                <span>{t('notFound')}</span>
                              </div> : 
       isSelectedModelLoading ? <span className={styles.preloader}><Preloader /></span> : 
       selectedModel  ? 
       <div className={styles.global__container}>
         <div className={styles.container}>
            <div className={styles.categoryName}>{locale &&  selectedModel?.categories[locale]}</div>
            <div className={styles.modelItself}>
              <div className={styles.imageContainer}>
                  <img src={`${IMG_URL}${selectedModel?.model_img}`} alt='image' className={styles.image} />
                  <img src={isHeartChecked ? heartChecked : heart} className={styles.heart} onClick={() => setHeartChecked(!isHeartChecked)}/>
              </div>


              <div className={styles.modelInfoContent}>
                <div className={styles.infoHeader}>
                  <div className={styles.modelName}>{selectedModel?.model_names[locale] ? selectedModel?.model_names[locale] : selectedModel?.model_names['tm']}</div>
                </div>
                <span className={styles.desc}>{selectedModel?.desc}</span>    

                
                <div className={styles.formats}>
                  {selectedModel?.formats?.map((format: any, i: number) => (
                    <div className={styles.format} key={i}>
                      {format.label}
                    </div>
                  ))}
                </div>
                
                <span className={styles.class}>{locale && selectedModel?.classes[locale]}</span>
                <Button style={{ width: '80px' }} rounded color='orange'><a className={styles.download} href={`${FILE_URL}${selectedModel?.model_zip}`} download={true}>Download</a></Button>
              </div>
            </div>
        </div>

        {
          isModelsLoadError ? <div className={styles.notFound}>
                                <img src={Nodata} className={styles.noModelFoundIcon}/>
                              <span>{t('notFound')}</span>
        </div> : 
          isModelsLoading ?  
            <span className={styles.preloader}><Preloader /></span> :
          Models?.length ? 
          <div className={styles.recomendationModels}>
            <Row colGutter={5} rowGutter={5}>
            {
              Models?.map((item: any, index: number) => (
                <Col grid={{ xs: 12, sm: 6, md: 4, lg: 4, xlg: 3, xxlg: 3 }}  key={index}>
                  <ModelCard 
                    item={item}
                    categoryId={item.categories.value}
                    isLiked={item.is_liked}
                    modelId={item.model_guid}
                    image={item.model_img}
                    zip={item.model_zip}
                    modelName={locale && item.model_names[locale] ? item.model_names[locale] : item.model_names.tm}
                    date={item.crt_date}
                    description={item.desc}
                    formats={item.formats}
                    onClick={(modelGuid: string) => {
                      navigate({ to: `/free/${modelGuid}` })
                    }}
                  />
                </Col>
              ))
            }
            </Row>
          </div>
          : <div className={styles.notFound}>
              <img src={Nodata} className={styles.noModelFoundIcon}/>
              <span>{t('notFound')}</span>
            </div>
        }
      </div>

       : ''
       }
    </>
  )
}

export default SelectModel



