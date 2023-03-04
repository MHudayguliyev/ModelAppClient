import {useState, useEffect} from 'react'
import { useQuery } from 'react-query'
//form controller
import { useFormik } from 'formik'
import * as yup from 'yup'

//react hot toast 
import toast from 'react-hot-toast'
/// css 
import './AddCategoryModal.css'
import { addNewCategory } from '../../../api/queries/Posts'

type AddCategoryModalProps = {
    openAddCategory: any
}

const AddCategoryModal = (props: AddCategoryModalProps) => {
    const { openAddCategory } = props
    const [addCategoryInputValue, setAddCategoryInputValue] = useState<string | any>({ tm: '', ru: '', en: '' })

    ///refecth 
    const { refetch } = useQuery('getCategories', {refetchOnWindowFocus: false})

    const AddNewCategory = async (e: any) => {
        e.preventDefault()
        try {
            if(addCategoryInputValue.tm == ''){
                return toast.error('Please, enter value to add', { style: {zIndex: '1000'} })
            }
            const res: any = await addNewCategory({tm: addCategoryInputValue.tm, en: addCategoryInputValue.en, ru: addCategoryInputValue.ru})
            if(res.status === 200){
                toast.success(res?.response)
                openAddCategory(false)
                refetch()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     console.log('value', addCategoryInputValue.en)
    // }, [addCategoryInputValue])


    // const formik = useFormik({
    //     initialValues: {
    //         addCategoryInputValue: ''
    //     },
    //     validationSchema: yup.object({
    //         addCategoryInputValue: yup.string()
    //         .min(3, '')
    //         .required('')
    //     }),
    //     onSubmit: async (values: any, {resetForm}) => {
    //         console.log(values)
    //         try {
    //             const res:any = addNewCategory(values)
    //             if(res?.status === 200){
    //                 toast.success(res?.response)
    //                 openAddCategory(false)
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // })


    return (
            <div className='addCatMdarkBG' >
                <div className='addCatMcentered'>
                    <div className='addCatMmmodal'>
                        <div className='addCatMmodalHeader'>
                            <div className='addCatMheading'>Dialog</div>
                        </div>
                        <button className='addCatMcloseBtn' onClick={() => openAddCategory(false)}>X</button>
                        <div className='addCatMmodalContent'>
                            <input autoComplete='off' autoFocus={true} type='search' className='addCatMinput' name='addCategoryInputValue' onChange={(e) => setAddCategoryInputValue((prevState: any) => ( {...prevState, tm: e.target.value}))} value={addCategoryInputValue.tm} />
                            <input autoComplete='off' type='search' className='addCatMinput' name='addCategoryInputValue' onChange={(e) => setAddCategoryInputValue((prevState: any) => ( {...prevState, ru: e.target.value}))} value={addCategoryInputValue.ru} />
                            <input autoComplete='off' type='search' className='addCatMinput' name='addCategoryInputValue' onChange={(e) => setAddCategoryInputValue((prevState: any) => ( {...prevState, en: e.target.value}))} value={addCategoryInputValue.en} />
                        </div>
                        <div className='addCatMmodalActions'>
                            <div className='addCatMactionsContainer'>
                                <button className='addCatMsaveChangesBtn' onClick={(e) => AddNewCategory(e)}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default AddCategoryModal