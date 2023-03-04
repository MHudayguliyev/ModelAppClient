import React from 'react'
/// redux 
import { useDispatch, useSelector } from "react-redux";
import { setCategoryGuid, setCategoryFocus, setSearch } from "../../redux/actions/ModelAction";
import {AiOutlineClear} from 'react-icons/ai'
//icon url 
import {ICON_URL} from '../../assets/base'
//// import css here
import './Categories.css'

interface CategoryProps {
    data: any,
    loading: any,
    error: any,
    refetch: any
}

const Categories = (props: CategoryProps) => {
    const { data, loading, error, refetch } = props
    const dispatch = useDispatch()

    const focus = useSelector((state: any) => state.modelsReducer.categoryFocus)

    const handleClick = (id: string) => {
        dispatch(setCategoryGuid(id))
        dispatch(setCategoryFocus(id))
    }

    const clear = () => {
        dispatch(setCategoryGuid(''))
        dispatch(setCategoryFocus(''))
        dispatch(setSearch(''))
        refetch()
    }



    const value: string | any = localStorage.getItem('language')


    return (
        <>
            <div className="categoriesSection">
                <>
                    {data?.map((item: any, i:number) => (
                        <div className={`icon ${focus === item.cat_uuid ? `focus` : ''}`} key={i} onClick={() => handleClick(item.cat_uuid)}>
                            <img src={`${ICON_URL}${item.icon}`} className='categoryIcon'/> <br></br>
                            <span >{value !== '' && item[value] ? item[value] : item.tm}</span>  
                        </div>
                    ))}
                </>
                <div className="clearFilterContainer" onClick={clear}>
                    <span className="clearFilterIcon"><AiOutlineClear /></span>
                </div>
            </div>
        </>
    )
}

export default Categories