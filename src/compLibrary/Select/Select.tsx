import React from 'react'
import Select from 'react-select'

interface SelectProps {
    options: any,
    multi?: boolean,
    onChange: any,
    defaultValue?: any
}

const customStyles: any = {
    singleValue: (base: any) => ({
      ...base,
      padding: "5px 10px",
      borderRadius: 5,
      display: "flex",
      width: "fit-content",
      background: 'rgb(255, 128, 0)',
      color: 'whitesmoke'
    }),
    control: (defaultStyles: any) => ({
      ...defaultStyles,
      boxShadow: "none",
    })
  };

const SelectOptions = (props: SelectProps) => {
    const {
        options,
        multi=false,
        onChange,
        defaultValue
    } = props

    // console.log('value', value)

  return (
    <div>
         <Select defaultValue={defaultValue} options={options} isMulti={multi} styles={customStyles} onChange={onChange} />
    </div>
  )
}

export default SelectOptions