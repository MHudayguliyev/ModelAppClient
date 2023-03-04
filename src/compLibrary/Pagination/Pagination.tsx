import React, { useEffect, useState } from "react"

// custom styles
import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
import { capitalize } from "@app/utils/helpers";

// react icons
import {MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/md'

const cx = classNames.bind(styles);

type PaginationProps = {
   /** @default 'medium'
    * @description The size of the component
    */
   size?: 'small' | 'medium' | 'big'
   /** @default 1
    * @description The total number of pages.
    */
   count?: number
   /** @default false */
   disabled?: boolean
   onChange: (page: number) => void
   // onPrevClick: Function,
   // onNextClick: Function
   /** @description The current page. */
   page: number
   /** @description The visible portion of number. */
   portionSize: number
   /** @default 'circular'
    * @description The shape of the pagination items.
    */
   shape?: 'circular' | 'rounded'
}

const Pagination = (props: PaginationProps) => {

   const {
      size = 'medium',
      count = 1,
      disabled = false,
      onChange,
      page,
      portionSize,
      shape = 'circular',
   } = props;

   let pages: number[] = []
   for (let x = 1; x <= count; x++) {
      pages.push(x)
   }


   const [portionNumber, setPortionNumber] = useState(1);
   const portionCount = Math.ceil(count / portionSize);
   const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
   const rightPortionPageNumber = portionNumber * portionSize;
   const portionPages = pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)

   useEffect(() => {
      if (!portionPages.length)
         setPortionNumber(1)
   }, [portionPages.length])

   return (
      <div className={
         cx({
            paginationWrapper: true,
            disabled: disabled
         })
      }>
         <button
           onClick={() => setPortionNumber(portionNumber - 1) }
            disabled={portionNumber <= 1}
            className={
               cx({
                  buttonStyle: true,
                  [`buttonSize${capitalize(size)}`]: true,
                  [`buttonShape${capitalize(shape)}`]: true,
                  disabled: portionNumber <= 1 && !disabled,
                  pagebtn: true
               })
            }>
            <span className={styles.icon}  >
               <MdKeyboardArrowLeft />
            </span>
         </button>
         {
            portionPages.map((p) => {
               return (
                  <button key={p}
                     onClick={() => { onChange(p) }}
                     className={
                        cx({
                           selected: page === p,
                           buttonStyle: true,
                           [`buttonSize${capitalize(size)}`]: true,
                           [`buttonShape${capitalize(shape)}`]: true,
                        })
                     }
                  >
                     {p}
                  </button>
               )
            })
         }
         <button
          onClick={() => setPortionNumber(portionNumber + 1)}
            // disabled={portionCount <= portionNumber}
            className={
               cx({
                  buttonStyle: true,
                  [`buttonSize${capitalize(size)}`]: true,
                  [`buttonShape${capitalize(shape)}`]: true,
                  disabled: portionCount <= portionNumber && !disabled,
                  pagebtn: true
               })
            }>
            <span className={styles.icon}   >
               <MdKeyboardArrowRight />
            </span>
         </button>
      </div>
   )
}

export default Pagination;