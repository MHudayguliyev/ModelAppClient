import React, { CSSProperties, useMemo } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link, LinkProps } from '@tanstack/react-location';
import { capitalize } from '@app/utils/helpers';

export type ButtonProps = {
    children: React.ReactNode
    style?: CSSProperties
    /** @default contained */
    type?: 'contained' | 'text'
    onClick?: (event: any) => void,
    color?: 'blue' | 'red' | 'cyan' | 'green' | 'orange' | 'grey' | string
    /** @defaultValue false  */
    disable?: boolean
    /** @defaultValue false  */
    loading?: boolean
    /** @defaultValue false  */
    fullWidth?: boolean
    /** @default false */
    fullHeight?: boolean
    /** @defaultValue false  */
    startIcon?: JSX.Element
    endIcon?: JSX.Element
    /** @default false */
    removePadding?: boolean
 
    /** @defaultValue false */
    circle?: boolean
    /** @defaultValue false */
    rounded?: boolean
    /** @defaultValue false */
    topRounded?: boolean
    /** @defaultValue false */
    bottomRounded?: boolean
    /** @defaultValue false */
    leftRounded?: boolean
    /** @defaultValue false */
    rightRounded?: boolean
    center?: boolean
    linkProps?: LinkProps
    /** @default "button" */
    htmlType?: "button" | "submit" | "reset",
    /** @default false */
    isIconContent?: boolean;
    border?: boolean
}

const cx = classNames.bind(styles);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref): JSX.Element => {
    const {
        children,
        style,
        type = 'contained',
        disable = false,
        loading = false,
        fullWidth = false,
        fullHeight = false,
        startIcon,
        endIcon,
        removePadding,
        onClick,
        circle = false,
        rounded = false,
        topRounded = false,
        bottomRounded = false,
        leftRounded = false,
        rightRounded = false,
        center = false,
        linkProps,
        htmlType = "button",
        isIconContent = false,
        color = 'blue',
        border} = props;

     const content = useMemo(() => {
        return (
           <div className={
              cx({
                 baseChildStyle: true,
                 centerComponent: center || isIconContent,
                 paddingWithIcon: startIcon || endIcon || typeof children === 'object',
                 removePadding: removePadding,
                 isIconContent: isIconContent
              })
           } >
              {
                 startIcon && <span className={`${styles.pr1} ${styles.removeUndueSpace}`} >{startIcon}</span>
              }
              {children}
              {
                 endIcon && <span className={styles.pl1} >{endIcon}</span>
              }
           </div>
        )
     }, [startIcon, endIcon, children])

  return (
    <>
    <button
         type={htmlType}
         ref={ref}
         disabled={disable || loading}
         onClick={onClick}
         style={style}
         className={
            cx({
               baseStyle: true,
               [`type${capitalize(type)}`]: true,
               [`color${capitalize(color)}`]: !loading && type === 'contained' && color !== 'grey',
               colorGrey: color === 'grey' && type === 'text',
               loading: loading,
               disable: disable,
               fullWidth: fullWidth,
               fullHeight: fullHeight,
               circle: circle,
               rounded: rounded,
               topRounded: topRounded,
               bottomRounded: bottomRounded,
               leftRounded: leftRounded,
               rightRounded: rightRounded,
               isIconContent: isIconContent,
               btnBorder: border
            })
         }
      >
         {
            linkProps?.to ?
               <Link {...linkProps} className={styles.link}>
                  {content}
               </Link>
               :
               content
         }

      </button >
    </>
  )
})

export default Button