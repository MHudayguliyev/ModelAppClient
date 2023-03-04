import React, {useState, useEffect} from 'react'
import { useMatch } from '@tanstack/react-location'
//react icons
import {BiSearch} from 'react-icons/bi'
// css
import './Search.css'
// apis getters
import {GetAdminModels, GetModels, GlobalSearch} from '../../api/queries/Getters'
/// react-hot-toast
import toast from 'react-hot-toast'
//redux
import {useDispatch, useSelector} from 'react-redux'
import {setFreeModels, setCategoryFocus, setModelCount, setSearch} from '../../redux/actions/ModelAction'
import {setAdminData, setAdminModelsCount} from '../../redux/actions/AdminAction'
import { Models } from '@app/api/Types/queryReturnTypes/Models'
import { useQuery } from 'react-query'


// async function checkIfAccepted (state: boolean, value: string): Promise<Models[] | any>{
//     const res: Models[] | any = GlobalSearch(value, state)
//     return res
// }


interface SearchProps{
  icon: any
}

const Search = (props: SearchProps) => {
  const dispatch = useDispatch()
  const match = useMatch()
  // console.log('match', match)
  const {icon} = props
  // const accepted: boolean = match.pathname === '/free/'
  // const [search, setSearch] = useState<string|number|any>('')

  //redux states
  const page = useSelector((state: any) => state.modelsReducer.page)
  const limit = useSelector((state: any) => state.modelsReducer.limit)
  const adminPage = useSelector((state: any) => state.adminReducer.page)
  const adminLimit = useSelector((state: any) => state.adminReducer.limit)
  const search = useSelector((state: any) => state.modelsReducer.searchValue)


  const {refetch: refetchFreeModels} = useQuery(['getModels', page, limit], () => GetModels(page, limit, '', ''))
  const {refetch: refetchAdminModels} = useQuery(['getAdminModels', adminPage, adminLimit], () => GetAdminModels(adminPage, adminLimit))

  const handleSearch = async (search: any) => {
      try {

        if(match.pathname === '/free/'){
          if(!search) {
            const res = await refetchFreeModels()
            dispatch(setFreeModels(res.data.data))
            dispatch(setModelCount(res.data.count))
            dispatch(setCategoryFocus(''))

          }else {
            const response = await GlobalSearch(search, match.pathname)
            const data = response.data
            const count = response.count
            dispatch(setFreeModels(data))
            dispatch(setModelCount(count))
            dispatch(setCategoryFocus(''))
          }
        }else if(match.pathname === '/admin-control'){
          if(!search){
            const res: any = await refetchAdminModels()
            console.log('res.data.data', res.data)
            dispatch(setAdminData(res.data.data))
          }else {
            const response = await GlobalSearch(search, match.pathname)
            const data = response.data
            dispatch(setAdminData(data))
          } 
        }
        else if(match.pathname === `/free/${match.params.modelGuid}`) {
          if(!search){

          }else {

          }
        }
      } catch (error: any) {
        if(error){
          if(error.response){
            if(error.response.data){
              toast.error(error.response.data)
            }else {
              toast.error(error.response)
            }
          }
        }else {
          toast.error(error)
        }
      }
  }


  const onKeyDown = async (e: any) => {
    try {
      if(e.which == 13){
        e.preventDefault()
        if(match.pathname === '/free/'){
          if(!search) {
            const res = await refetchFreeModels()
            dispatch(setFreeModels(res.data.data))
            dispatch(setModelCount(res.data.count))
            dispatch(setCategoryFocus(''))

          }else {
            const response = await GlobalSearch(search, match.pathname)
            const data = response.data
            const count = response.count
            
            dispatch(setFreeModels(data))
            dispatch(setModelCount(count))
            dispatch(setCategoryFocus(''))
          }
        }else if(match.pathname === '/admin-control'){
          if(!search){
            const res: any = await refetchAdminModels()
            console.log('res.data.data', res.data)
            dispatch(setAdminData(res.data.data))
          }else {
            const response = await GlobalSearch(search, match.pathname)
            const data = response.data
            const count = response.count
            dispatch(setAdminData(data))
            dispatch(setAdminModelsCount(count))
          } 
        }
        else if(match.pathname === `/free/${match.params.modelGuid}`) {
          if(!search){

          }else {

          }
        }
      }
    } catch (error: any) {
      if(error){
        if(error.response){
          if(error.response.data){
            toast.error(error.response.data)
          }else {
            toast.error(error.response)
          }
        }
      }else {
        toast.error(error)
      }
    }
  }

  useEffect(() => {
    console.log('search',search)
  }, [search])

  return (
    <div className='search-container'>
        <form className='theGlobalSearchForm'> 
            <input className='global-search' type='text' placeholder='Search' name='search' autoComplete='off' value={search} onChange={(e) => dispatch(setSearch(e.target.value))} onKeyDown={onKeyDown}/>
            <span className='globalSearchIcon' onClick={() => handleSearch(search)}>{icon}</span>
        </form>
    </div>
  )
}

export default Search