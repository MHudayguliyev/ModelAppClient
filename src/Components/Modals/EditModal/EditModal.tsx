import React from 'react'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
//css 
import classNames from 'classnames/bind'
import styles from './EditModal.module.scss'
// toast
import toast from 'react-hot-toast'
/// types 
import CategoryTypes from '@api/Types/queryReturnTypes/Categories'
import {ModelFormatTypes} from '@api/Types/queryReturnTypes/ModelFormat'
/// getter/poster
import { saveChanges } from '../../../api/queries/Posts'
import { GetModelClasses } from '../../../api/queries/Getters'
import moment from 'moment'
/// comps 
import Select from '../../../compLibrary/Select/Select'
import Button from '@compLib/Button/Button'
import Modal from '@compLib/Modal/Modal'

interface EditModalProps {
    setIsOpen: Function,
    isOpen: boolean,
    closeIcon: any,
    categories: CategoryTypes[] | any,
    formats: ModelFormatTypes[] | any,
    selectedItem: any
}

interface InputTypes {
    categories: any,
    formats: any,
    classes: any,
    price: number,
    modelImg: string,
    modelZip: string,
    locales: {
        tm: string,
        en: string,
        ru: string,
    },
    desc: string
}

const EditModal = (props: EditModalProps) => {
    const { setIsOpen, isOpen, closeIcon, categories, formats, selectedItem } = props

    const cx = classNames.bind(styles)

    ///states 
    const [adminInputs, setAdminInput] = useState<InputTypes>({ 
        categories: selectedItem?.categories, 
        formats: selectedItem?.formats, 
        classes: selectedItem?.classes, 
        price: selectedItem?.price_value, 
        modelImg: selectedItem?.model_img,
        modelZip: selectedItem?.model_zip,
        locales: {tm: selectedItem?.model_names?.tm, en: selectedItem?.model_names?.en, ru: selectedItem?.model_names?.ru}, 
        desc: selectedItem?.model_line_desc })
    const [file, setFile] = useState<any>({})
    const [counter, setCounter] = useState<number>(0)
    const [disabled, setDisabled] = useState<boolean>(false)
    
    /// locale
    const localeValue: any = localStorage.getItem('language')

    ///options
    const categoryOptions = categories?.map((item: any) => {
        return {value: item.cat_uuid, label: localeValue && item[localeValue] ? item[localeValue] : item.tm}
    })
    const formatOptions = formats?.map((item: any) => {
        return {value: item.format_guid, label: item.format_name}
    })

    /// option
    const categoryOption = {value: adminInputs?.categories.value, label: adminInputs?.categories?.label[localeValue]}

    const Close = () => {
        setIsOpen(false)
        setAdminInput({ categories: [], formats: [], classes: [], price: 0, modelImg: '', modelZip: '', locales: { tm: '', en: '', ru: ''}, desc: '' })
        setFile({})
    }

    const handleChange = (e: any) => {
        const value = e.target.files
        const FileTypes = value?.[0]?.['type']
        const validTypes = ['application/x-zip-compressed', 'application/x-rar-compressed']

        if(value?.[0]?.['type'].startsWith('application')) {
            if(validTypes.includes(FileTypes)) {
                setFile(value?.[0])
                setCounter((value: number) => value + 1)
                toast.success(`${value?.[0]?.name} selected`, { style: {zIndex: 9999} })
            }
        }
    }


    const Cancel = () => {
        setIsOpen(false)
        setAdminInput({ categories: [], formats: [], classes: [], price: 0, modelImg: '', modelZip:'', locales: {tm: '', en: '', ru: ''}, desc: '' })
        setFile({})
    }

    const SaveChanges = async (e: any) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            console.log('file', file)
            formData.append('attachment', file ? file : null)

            const config = {
                method: 'POST',
                headers: {
                  "Content-Type": "multipart/form-data",
                }
            }

            const res: any = await saveChanges(formData, config, {
                modelGuid: selectedItem?.model_guid,
                categoryGuid: adminInputs.categories?.value,
                classGuid: adminInputs.classes?.value,
                formats: adminInputs.formats,
                locales: {
                    tm: adminInputs.locales.tm,
                    ru: adminInputs.locales.ru,
                    en: adminInputs.locales.en
                },
                desc: adminInputs.desc,
                price: adminInputs.price,
                modelImg: adminInputs.modelImg,
                modelZip: adminInputs.modelZip
            })
            if(res.status === 200){
                setIsOpen(false)
                window.location.reload()
            }

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if(counter === 1) {
            setDisabled(true)
        }else if(counter < 1){
            setDisabled(disabled)
        } 
    }, [counter])

    console.log('sel item', selectedItem)




    return (
        <>
            <Modal isOpen={isOpen} close={() => Close()} className={styles.container}>
                <div className={styles.subContainer}>
                    <div className={styles.header}>
                        {
                        selectedItem?.model_names[localeValue] ? selectedItem?.model_names[localeValue] : selectedItem?.model_names['tm']
                        }
                    </div>

                    <form className={styles.form}>
                        <div className={styles.editModelCategorySelection}>
                            <Select options={categoryOptions} defaultValue={categoryOption} onChange={(option: any) => setAdminInput((value) => ({...value, categoryGuid: option.value}))}/>
                        </div>
                        <div className={styles.editModelFormatSelection}>
                            <Select options={formatOptions} multi={true} onChange={(option: any) => setAdminInput((value) => ({...value, formats: option}))}/>
                        </div>

                        
                        <div className={styles.editModalInputs}>
                            <input type='search' placeholder='tm' className={styles.adminTm} value={adminInputs.locales.tm} 
                                onChange={(e) => setAdminInput((value: any) => ({...value, locales: {tm: e.target.value, ru: adminInputs.locales.ru.length ?adminInputs.locales.ru :selectedItem.model_names.ru , en: adminInputs.locales.en.length?adminInputs.locales.en:selectedItem.model_names.ru}}))}/>
                            <input type='search' placeholder='ru' className={styles.adminRu} value={adminInputs.locales.ru} 
                                onChange={(e) => setAdminInput((value: any) => ({...value, locales: {ru: e.target.value, tm: adminInputs.locales.tm.length ?adminInputs.locales.tm :selectedItem.model_names.tm , en: adminInputs.locales.en.length?adminInputs.locales.en:selectedItem.model_names.en}}))}/>
                            <input type='search' placeholder='ru' className={styles.adminEn} value={adminInputs.locales.en} 
                                onChange={(e) => setAdminInput((value: any) => ({...value, locales: {en: e.target.value, ru: adminInputs.locales.ru.length ?adminInputs.locales.ru :selectedItem.model_names.ru , tm: adminInputs.locales.tm.length?adminInputs.locales.tm:selectedItem.model_names.tm}}))}/>
                            {adminInputs.classes.label.en=='Premium'||adminInputs.classes.label.tm=='Tolegli'||adminInputs.classes.label.tm=='Премиум' ? <input type='number' placeholder='price' className={styles.adminPrice} value={adminInputs.price} onChange={(e) => setAdminInput((value: any) => ({...value, price: e.target.value}))}/> : null} 
                        </div>

                        
                        <label htmlFor='editModalSelectId' className={cx({
                            editModalChoice: true,
                            fadeEditModelLabel: disabled
                        })}>Select file</label>
                        <input type='file' className={styles.editModalInvisible} id='editModalSelectId' disabled={disabled} onChange={e => handleChange(e)}/>

                        <div className={styles.editModalFilePreview}>
                            {file?.name}
                        </div>
                        <textarea value={adminInputs.desc} onChange={(e) => setAdminInput((value) => ({...value, desc: e.target.value}))} className={styles.editModalDesc} cols={4} rows={4} maxLength={200} placeholder='description..'></textarea>


                    </form>
                </div>

                <div className={styles.modalActionContainer}>
                    <button className={styles.modalYes} onClick={SaveChanges}>Save</button>
                    <button className={styles.modalNo} onClick={Cancel}>Cancel</button>
                </div>
            </Modal>
        </>
    )
}

export default EditModal
{/* <div className={styles.editModalContainer}>
            
            <div className={styles.editModalCentered}>
                <div className={styles.editModal}>

                    <div className={styles.editModalHeader}>
                        <div className={styles.editModalHeading}>

                        </div>
                    </div>

                    <button className={styles.editModalClose} onClick={(e) => closeModal(e)}>{closeIcon}</button>

                    <div className={styles.editModalContent}>
                        <form className={styles.editModalForm}>
                            <div className={styles.editModelCategorySelection}>
                                <Select options={categoryOptions} defaultValue={categoryOption} onChange={(option: any) => setAdminInput((value) => ({...value, categoryGuid: option.value}))}/>
                            </div>

                            <div className={styles.editModelFormatSelection}>
                                <Select options={formatOptions} multi={true} onChange={(option: any) => setAdminInput((value) => ({...value, formats: option}))}/>
                            </div>


                        </form>
                    </div>

                    <div className={styles.modalActionContainer}>
                        <button className={styles.modalYes} onClick={SaveChanges}>Save</button>
                        <button className={styles.modalNo} onClick={Cancel}>Cancel</button>
                    </div>

                </div>
            </div>
        </div> */}