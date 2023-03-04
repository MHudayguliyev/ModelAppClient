import React from 'react'
import { useState, useEffect, useMemo, useRef } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useMatch} from '@tanstack/react-location';  
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

///redux 
import { setItem, setFile, setImage, setImageNametm, setImageNameen, setImageNameru, setModelDesc, setModelPrice, setShowDialog } from '../../redux/actions/UploadAction'
// comps
import { uploadImage } from '../../api/queries/Posts'
import { GetCategories, GetModelClasses, GetModelFormats } from '../../api/queries/Getters'
import Select from '../../compLibrary/Select/Select'
import Input from '@compLib/Input/index'
import TextArea from '@compLib/TextArea/index'
import Button from '@compLib/Button/Button'
/// react icons 
import {BiTrashAlt} from 'react-icons/bi'
///css
import classNames from 'classnames/bind'
import styles from './UploadModels.module.scss'
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    name?: string;
  }
}

type ModelClassType = {
  className: string,
  classGuid: string
}

const cx = classNames.bind(styles)

const UploadModels = ()=>  {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const inputRef = useRef()

    /// redux selectors  
    const file = useSelector((state: any) => state.uploadReducer.uploadDetails.file)
    const image = useSelector((state: any) => state.uploadReducer.uploadDetails.image)
    const imageNametm: string = useSelector((state: any) => state.uploadReducer.uploadDetails.imageNametm)
    const imageNameru: string = useSelector((state: any) => state.uploadReducer.uploadDetails.imageNameru)
    const imageNameen: string = useSelector((state: any) => state.uploadReducer.uploadDetails.imageNameen)
    const modelDesc: string = useSelector((state: any) => state.uploadReducer.uploadDetails.modelDesc)
    const items: any = useSelector((state: any) => state.uploadReducer.items)
    const modelPrice: string = useSelector((state: any) => state.uploadReducer.uploadDetails.modelPrice)
    const showDialog: boolean = useSelector((state: any) => state.uploadReducer.showDialog)


    //// fecth api
    const {
      data: categoryData,
      isLoading: categoryLoading,
      isError: categoryError,
      refetch
  } = useQuery('getCategories',() => GetCategories(), {refetchOnWindowFocus: true})

  const {
    data: modelFormats,
    isLoading: isFormatsLoading,
    isError: isFormatsError
  } = useQuery('getModelFormats', () => GetModelFormats(), { refetchOnWindowFocus: true })

  const {
    data: modelClasses,
    isLoading: isClassLoading,
    isError: isClassesFetchError,
  } = useQuery('getModelClasses', () => GetModelClasses(), {refetchOnWindowFocus: true})

    const localeValue: string | any = localStorage.getItem('language')

    const [preview, setPreview] = useState<string>('')
    const [categoryGuid, setCategoryGuid] = useState<any>('')
    const [formats, setFormats] = useState<any>([])
    const [classData, setClassData] = useState<ModelClassType>({ className: '', classGuid: '' })
    const [isDisableSelectBtn, setDisableSelectBtn] = useState<boolean>(false)
    const [counter, setCounter] = useState<number>(0)


    const categoryOptions: any = categoryData?.map((item: any) => {
      return {value: item.cat_uuid, label: localeValue && item[localeValue] ? item[localeValue] : item.tm}
    })
    const formatOptions = modelFormats?.map((item: any) => {
      return {value: item.format_guid, label: item.format_name}
    })
    const classOptions = modelClasses?.map((item: any) => {
      return {value: item.class_guid, label: localeValue && item[localeValue] ? item[localeValue] : item.tm}
    })



    const deleteImage = () => {
        if(image)
          dispatch(setImage(null));
          setPreview('')
          setCounter(counter -1)
    }
    const deleteFile = () =>  {
      if(file)
        dispatch(setFile(null))
        setCounter(counter -1)
    }


    const handleChange = (e: any) => {
      const value = e.target.files
      const validTypes = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'application/x-zip-compressed', 'application/x-rar-compressed']
      const notIns = ['text/plain', 'text/html', 'text/css', 'text/js', 'text/ts', 'application/json', 'application/x-msdownload']
      const FileTypes = value?.[0]?.['type']

      if(notIns.includes(value?.[0]?.['type'])){
        return toast.error('Invalid format for image or a file(zip/rar)')
      }else if(value?.[0]?.type === '') {
        toast.error('File type is not recognized! Please select either zip or rar file')
      }


      if(value?.[0]?.['type'].startsWith('application') && !file){
        if(validTypes.includes(FileTypes)){
          dispatch(setFile(value?.[0]))
          setCounter(counter + 1)
          toast.success(`${value?.[0]?.name} selected`)
        }else {
          toast.error('Please select a valid zip/rar file')
        }
      }
      
      if(value?.[0]?.['type'].startsWith('image') && !image) {
        if(validTypes.includes(FileTypes)){
            dispatch(setImage(value?.[0]))
            setCounter(counter + 1)
            toast.success(`${value?.[0]?.name} selected`)
        }else {
          toast.error('Please select a valid image')
        }
      }     
    }

    
    const Save = async (e: any) => {
      e.preventDefault()
      try {
        const formData = new FormData()
  
        if(!items.length){
          return toast.error('Please select neccassary files!')
        }else if(!file || !image || !imageNametm || formats?.length===0 || !classData.classGuid || !categoryGuid) {
          return toast.error('Please put credentials first!')
        }else if(classData.className==='Premium'||classData.className==='Tolegli'|| classData.className==='Премиум' && !modelPrice) {
          return toast.error('Please enter price!')
        }

        for(let i = 0; i < items.length; i++){
          formData.append('attachment', items[i])
        }

        const config = {
          method: 'POST',
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }

      
        const res: any = await uploadImage(formData, config, {
          id: categoryGuid,
          tm: imageNametm,
          ru: imageNameru,
          en: imageNameen,
          desc: modelDesc,
          formats,
          class_guid: classData.classGuid,
          price: modelPrice,
          // date: moment(new Date()).format('YY-MM-DD HH:mm:ss')
        })

        if(res.status === 201){
          navigate({ to: '/free', replace: true }) 
          toast.success(res.msg)
          dispatch(setFile(null))
          dispatch(setImage(null))
          dispatch(setImageNametm(''))
          dispatch(setImageNameru(''))
          dispatch(setImageNameen(''))
          dispatch(setModelDesc(''))
          dispatch(setModelPrice(''))
          setFormats([])
          setClassData({ className: '', classGuid: '' })
        }else {
          toast.error(res.msg)
        }
      } catch (error) {
        console.log(error)
      }
}



    useEffect(() => {
      if(file && file !== null && image && image !== null){
        dispatch(setItem([image, file]))
      }
    }, [file, image])

    useEffect(() => {
      if(!!image){
        const objectUrl = URL.createObjectURL(image)
        setPreview(URL.createObjectURL(image))

        return () => URL.revokeObjectURL(objectUrl)
      }
    }, [image])


    useEffect(() => {
      if(counter === 2){
        setDisableSelectBtn(true)
      }else if(counter < 2){
        setDisableSelectBtn(false)
      }
    }, [counter])


  return (
    <>
        <form className={styles.uploadForm}>
            <div className={styles.uploadContent}>
              <div className={styles.classSelection}>
                <Select options={classOptions} onChange={(option: any) => setClassData({ classGuid: option.value, className: option.label })}/>
              </div>

              <div className={styles.categorySelection}>
                <Select options={categoryOptions}  onChange={(option: any) => setCategoryGuid(option.value)}/>
              </div>

              <div className={styles.formatSelection}>
                <Select options={formatOptions} multi={true} onChange={(options: any) => setFormats(options)}/>
              </div>

              
              <Input 
                type='search'
                fontSize='big' 
                fontWeight='medium' 
                className={styles.inputValue} 
                value={imageNametm} 
                onChange={(e) => dispatch(setImageNametm(e.target.value))}
               />
              <Input 
                type='search' 
                fontSize='big' 
                fontWeight='medium' 
                className={styles.inputValue} 
                value={imageNameru} 
                onChange={(e) => dispatch(setImageNameru(e.target.value))}
              />
              <Input 
                type='search' 
                fontSize='big' 
                fontWeight='medium' 
                className={styles.inputValue} 
                value={imageNameen} 
                onChange={(e) => dispatch(setImageNameen(e.target.value))}
              />

              {classData.className==='Free'||
              classData.className==='Mugt'||
              classData.className==='Бесплатно'||
              classData.className==='' ?
               null : 
              <Input autoFocus type='number' fontSize='big' fontWeight='medium' className={styles.inputValue} value={modelPrice} onChange={(e) => dispatch(setModelPrice(e.target.value))} />
               }
              

              <label htmlFor='browse' className={cx({
                choice: true,
                fadeLabel: !!isDisableSelectBtn
              })}>
                {!!image && !file ? 'Select file please' : !!file && !image ? 'Select an image please' : !file && !image ? 'Start selecting' : file && image ? 'You are done' : null}
              </label>
              <Input 
                type='file' 
                fontSize='big' 
                fontWeight='medium' 
                className={styles.invisible} 
                id='browse'
                disabled={isDisableSelectBtn}
                onClick={(e: any) => e.target.value = ''} 
                onChange={e => handleChange(e)}
              />
              

              <div className={styles.filePreview}>
                {!preview && !file && <span className={styles.notFileSelectedYet}>No file selected yet</span>}
                  {preview !== '' &&  
                    <div className={cx({ imagePreviewContainer: true })}>
                      <img src={preview} className={styles.imagePreview}/>
                      <span className={styles.trashIcon} onClick={deleteImage}><BiTrashAlt /></span>
                    </div>
                  }
       

                {file && 
                  <div className={styles.zipPreview}>
                    <span>{file.name}</span>
                    <span className={styles.zipTrash} onClick={deleteFile}><BiTrashAlt /></span>
                  </div>
                }
              </div>

              <TextArea 
                cols={4}
                rows={4}
                maxLength={200}
                value={modelDesc}
                onChange={(e) => dispatch(setModelDesc(e.target.value))}
                style={{marginBottom: '5px'}}
              />
              <Button style={{display:'flex', justifyContent:'center', padding: '5px 0', fontSize: '16px'}} rounded color='orange' onClick={(e) => Save(e)}>Upload</Button>
            </div>
        </form>
    </>
  )
}
export default UploadModels