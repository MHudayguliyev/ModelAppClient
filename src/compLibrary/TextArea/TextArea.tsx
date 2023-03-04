
import styles from './TextArea.module.scss';
import classNames from 'classnames/bind';
import React, { ChangeEvent, TextareaHTMLAttributes, CSSProperties } from 'react';

const cx = classNames.bind(styles);

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
   style?: CSSProperties,
   placeholder?: string
   cols?: number
   rows?: number
   name?: string
   id?: string
   defaultValue?: string
   autofocus?: boolean
   fullWidth?: boolean
   fullHeight?: boolean
   minHeight?: number
   maxLength: number
   onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
   annuleRightBorder?: boolean
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref): JSX.Element => {

   const {
      style,
      placeholder,
      cols,
      rows,
      name,
      id,
      defaultValue,
      autoFocus,
      fullWidth,
      fullHeight,
      maxLength,
      onChange,
      annuleRightBorder,
      value
   } = props;


   return (
      <textarea
         style={style}
         ref={ref}
         name={name}
         id={id}
         cols={cols}
         rows={rows}
         placeholder={placeholder}
         value={value}
         maxLength={maxLength}
         defaultValue={defaultValue}
         autoFocus={autoFocus}
         className={
            cx({
               textAreaStyles: true,
               fullWidth: fullWidth,
               fullHeight: fullHeight,
               annuleRightBorder: annuleRightBorder
            })
         }
         onChange={onChange}
      />
   )
})

export default TextArea;