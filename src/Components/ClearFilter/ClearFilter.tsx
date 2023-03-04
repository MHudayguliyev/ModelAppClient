// import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'react-query'

import {AiOutlineClear} from 'react-icons/ai'
import './ClearFilter.css'
import { GetModels } from '../../api/queries/Getters'

interface ClearFilterProps {
    
}

const ClearFilterComp = (props: ClearFilterProps) => {
    const clearFilter =  () => {
        console.log('heyyy')
        refetch()
        console.log('refetched',refetch())
    }


    const { refetch } = useQuery('getModels', () => GetModels(), { refetchOnWindowFocus: false })
    

    return (
        <>
            <div className='clearFilterContainer'>
                <span className='clearFilterBtn' onClick={() => clearFilter()}><AiOutlineClear />asds</span>
            </div>
        </>
    )
}

export default ClearFilterComp