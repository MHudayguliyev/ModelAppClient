import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query'
import classNames from 'classnames/bind';
// preloader 
import Preloader from '../../compLibrary/Preloader';
//getter
import {GetAdminModels, GetCategories, GetModelFormats } from '../../api/queries/Getters';
/// image url
import NoDataFound from '../../assets/images/no-data.png'
///react icons
import { AiOutlineClose} from 'react-icons/ai'
// comps 
import EditModal from '../../Components/Modals/EditModal/EditModal';
import DeleteModal from '../../Components/Modals/DeleteModal/DeleteModal';
import UploadModal from '../../Components/Modals/UploadModal/UploadModal';
import ModelCard from '@app/Components/ModelCard/ModelCard'
import Pagination from '@compLib/Pagination';
import Col from '@compLib/Grid/Col'
import Row from '@compLib/Grid/Row'
//redux actions
import { setAdminData, setPage, setLimit, setAdminModelsCount } from '../../redux/actions/AdminAction';
/// translate
import { useTranslation } from 'react-i18next';
//// css
import styles from './Admin.module.scss'


const Admin = () => {
    const dispatch = useDispatch()
    const {t, i18n} = useTranslation()
    const cx = classNames.bind(styles)

    const [selectedItem, setSelectedItem] = useState<any>({})
    const [modelId, setModelId] = useState<string>('')
    const [isEditOpen, setEditOpen] = useState<boolean>(false)
    const [isUploadOpen, setUploadOpen] = useState<boolean>(false)
    const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false)
    // const [limit, setLimit] = useState<number>(10)
    // const [page, setPage] = useState<number>(1)
    const locale: any = i18n.language

    ///redux selectors
    const adminData = useSelector((state: any) => state.adminReducer.adminData)
    const adminModelsCount = useSelector((state: any) => state.adminReducer.adminModelsCount)
    const page = useSelector((state: any) => state.adminReducer.page)
    const limit = useSelector((state: any) => state.adminReducer.limit)

    const {
        data: adminModels,
        isLoading,
        isError,
        refetch,
        isRefetchError,
        isRefetching
    } = useQuery(['getAdminModels', page, limit],() => GetAdminModels(page, limit), {refetchOnWindowFocus: false})


    const {
        data: categories,
        isError: isCategoryFetcherror,
        isLoading: isCategoriesLoading
    } = useQuery('getAdminCategories', () => GetCategories(), {refetchOnWindowFocus: false})

    const {
        data: formats,
        isError: isFormatsError,
        isLoading: isFormatsLoading
    } = useQuery('getModelFormats', () => GetModelFormats(), {refetchOnWindowFocus: false})

        
    useEffect(() => {
        if(!isLoading && !isError && !isRefetching && !isRefetchError){
            dispatch(setAdminData(adminModels?.data))
            dispatch(setAdminModelsCount(adminModels?.count))

        }
    }, [isLoading, isError, isRefetching, isRefetchError])

    useEffect(() => {
        refetch()
    }, [page, limit])

    return (
        <>
        <DeleteModal 
        setIsOpen={setDeleteOpen} 
        isOpen={isDeleteOpen} 
        dispatch={dispatch} 
        modelId={modelId}
        />
        <UploadModal 
        setIsOpen={setUploadOpen} 
        isOpen={isUploadOpen}
        dispatch={dispatch} 
        modelId={modelId}
        /> 
        {isEditOpen && <EditModal 
            setIsOpen={setEditOpen}
            isOpen={isEditOpen} 
            closeIcon={<AiOutlineClose />} 
            categories={categories} 
            formats={formats} 
            selectedItem={selectedItem}
        />}
        {isLoading ? 
            <span className={styles.adminPreloader}><Preloader /></span> : 
        isError ?  
            <div className={styles.notFound}>
                <img src={NoDataFound} className={styles.icon}/>
                <span className={styles.text}>{t('notFound')}</span>
            </div> : 
        adminData?.length > 0 ? 
                <div className={styles.adminModels}>
                    <Row rowGutter={5} colGutter={5}>
                        {adminData?.map((item: any, index:number) => (
                            <Col grid={{ xs: 12, sm: 6, md: 4, lg: 4, xlg: 3, xxlg: 3 }} key={index}>
                                <ModelCard 
                                    item={item}
                                    modelId={item.model_guid}
                                    image={item.model_img}
                                    zip={item.model_zip}
                                    modelName={locale && item.model_names[locale] ? item.model_names[locale] : item.model_names.tm}
                                    date={item.crt_date}
                                    description={item.desc}
                                    formats={item.formats}
                                    onClick={(modelId) => {}}
                                    onEdit={(data: any) => {
                                        setEditOpen(true)
                                        setSelectedItem(data)
                                    }}
                                    onUpload={(modelId: string) => {
                                        setUploadOpen(true)
                                        setModelId(modelId)
                                    }}
                                    onDelete={(modelId: string) => {
                                        setDeleteOpen(true)
                                        setModelId(modelId)
                                    }}
                                    disableUnneccasary={true}
                                    showBtnGroup={true}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
             
        :   <div className={styles.notFound}>
                <img src={NoDataFound} className={styles.icon}/>
                <span className={styles.text}>{t('notFound')}</span>
            </div> 
        }

        <div className={styles.pagination}>
            <Pagination 
                count={
                    adminModelsCount ? 
                        Math.ceil(adminModelsCount / limit) : 0
                }
                page={page}
                onChange={(p) => dispatch(setPage(p))}
                portionSize={3}
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

export default Admin 
