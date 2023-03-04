import React from 'react'
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from '@tanstack/react-location';

//css
import styles from './Free.module.scss'

/// components
import Categories from "../../Components/Categories/Categories";
import ModelCard from '@app/Components/ModelCard/ModelCard';
import Preloader from '@compLib/Preloader';
import NoData from '@app/assets/images/no-data.png'

/// apis
import { GetModels } from '../../api/queries/Getters'

//redux
import { setFreeModels, setLimit, setModelCount, setPage } from "../../redux/actions/ModelAction"

//css row/col
import Row from '@compLib/Grid/Row'
import Col from '@compLib/Grid/Col'
import Pagination from '@compLib/Pagination/Pagination';


const Free = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t, i18n} = useTranslation()
    const locale = i18n.language

    /// redux selectors
    const freeModels = useSelector((state: any) => state.modelsReducer.freeModels)
    const categoryGuid = useSelector((state: any) => state.modelsReducer.categoryGuid)
    const page = useSelector((state: any) => state.modelsReducer.page)
    const limit = useSelector((state: any) => state.modelsReducer.limit)
    const modelsCount = useSelector((state: any) => state.modelsReducer.modelsCount)

    //states
    // const [limit, setLimit] = useState<number>(10)
    // const [page, setPage] = useState<number>(1)
    const modelGuid = '' // just for now

    const {
        data: categories, 
        isLoading: categoryLoading, 
        isError: categoryError,
        refetch: RefetchCategories
    } = useQuery('getCategories', {refetchOnWindowFocus: false})   /// getCategories() getter is in navbar component, loook there!

    const {
        data: models,
        isLoading: isModelsLoading,
        isError: isModelLoadError,
        refetch: RefetchModels,
        isRefetchError, 
        isRefetching,
    } = useQuery(['getModels', page, limit, categoryGuid], ()=> GetModels(page, limit, categoryGuid, modelGuid), 
        { refetchOnWindowFocus: false })

    useEffect(() => {
        if(!isModelsLoading && !isModelLoadError && !isRefetchError && !isRefetching){
            console.log(models)
            dispatch(setFreeModels(models?.data || []))
            dispatch(setModelCount(models?.count || 0))
        }
    }, [isModelsLoading, isModelLoadError, isRefetchError, isRefetching])

    useEffect(() => {
        RefetchModels()
    }, [limit, page])

    

    

    return (
        <>
            <Categories 
                data={categories} 
                loading={categoryLoading} 
                error={categoryError} 
                refetch={RefetchModels}
            />

{/* isModelsLoading */}
            {
                isModelsLoading ? 
                <span className={styles.preloader}><Preloader /></span> : 
                isModelLoadError ?
                <div className={styles.notFound}>
                    <img src={NoData} className={styles.noModelFoundIcon}/>
                    <span>{t('notFound')}</span>
                </div> : 
                freeModels?.length > 0? 
                    <div className={styles.freeModels}>
                        <Row rowGutter={5} colGutter={5} >
                            {freeModels?.map((item: any, index: number) => (
                                <Col grid={{ xs: 12, sm: 6, md: 4, lg: 4, xlg: 3, xxlg: 3 }} key={index}>
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
                                        onClick={(modelId) => {
                                            navigate({ to: `/free/${modelId}`});
                                        }}
                                    />
                                </Col> 
                            ))}
                        </Row>
                    </div>
                 
                : 
                <div className={styles.notFound}>
                    <img src={NoData} className={styles.noModelFoundIcon}/>
                    <span>{t('notFound')}</span>
                </div>
            }

            <div className={styles.pagination}>
                <Pagination 
                    page={page}
                    portionSize={4}
                    count={
                        modelsCount ? 
                            Math.ceil(modelsCount / limit) : 0
                    }
                    onChange={(page) => dispatch(setPage(page))}
                />
                <select onChange={e => dispatch(setLimit(Number(e.currentTarget.value)))}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={100}>100</option>
                    <option value={1000}>1000</option>
                </select>
            </div>
        </>
    )
}

export default Free