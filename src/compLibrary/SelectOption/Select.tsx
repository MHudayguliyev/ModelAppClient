import { useQuery } from "react-query"
import { GetCategories } from "../../api/queries/Getters"


import './Select.css'

const Select = () => {

  const formats = [
    {
      id: 1,
      name: '.obj'
    },
    {
      id: 2,
      name: '.svg'
    },
    {
      id: 3,
      name: '.blend'
    },
    {
      id: 4,
      name: '.max'
    },
    {
      id: 5,
      name: '.3ds'
    },
    {
      id: 6,
      name: '.fbx'
    },
    {
      id: 7,
      name: '.c4d'
    },
  ]

    const {
        data,
        isLoading: categoryLoading, 
        isError: categoryError,
        refetch: RefetchCategories
    } = useQuery('getCategories', () => GetCategories())

  return (
    <>
        <select>
           {formats?.map((item: any) => (
            <option key={item.id}>{item.name}</option>
           ))}
        </select>
    </>
  )
}

export default Select