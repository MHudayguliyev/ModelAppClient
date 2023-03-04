import {useState, useEffect} from 'react'
import './ProgressBar.css'

type ProgressBarTypes = {
    width: number;
    percent: number | any
}

const ProgressBar = (props: ProgressBarTypes) => {
    const {
        width,
        percent
    } = props

    const [value, setValue] = useState<number>(0)

    useEffect(() => {
        setValue(percent * width);
      });

  return (
    <div className="progress-div" style={{width: width}}>
        <div style={{width: `${value}px`}}className="progress" />
    </div>
  )
}

export default ProgressBar