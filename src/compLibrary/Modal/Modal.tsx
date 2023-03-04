import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Button from "../Button/Button";
/// styles
import styles from './Modal.module.scss';
import classNames from "classnames/bind";
///react icons 
import {AiOutlineClose} from 'react-icons/ai'


const cx = classNames.bind(styles);

interface KeyboardEvent {
    key: string;
    preventDefault: Function
 }
 
 type ModalProps = {
    isOpen: boolean
    close: Function
    children: ReactNode
    header?: ReactNode
    footer?: ReactNode
    /** @default false */
    fullScreen?: boolean
    className?: string
    style?: CSSProperties
    styleOfModalBody?:CSSProperties
 }
const Modal = (props: ModalProps) => {
    const {
        isOpen,
        close,
        children,
        header,
        footer,
        fullScreen = false,
        className = '',
        style,
        styleOfModalBody
     } = props;

     useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
               event.preventDefault();
               close()
            }
         }
         document.addEventListener('keydown', keyDownHandler);
         return () => {
            document.removeEventListener('keydown', keyDownHandler);
         };
     }, [])

    const modalContent = isOpen ? (
    <div className={
        cx({
            modal: true,
            notFullScreenModal: !fullScreen
        })
    }>
        <div style={style} className={`${className} ${cx({
                modalContent: true,
                modalAnimation: isOpen,
                fullScreen: fullScreen
            })}
        `}>
            <div className={styles.modalHeader} style={{ justifyContent: !!header ? 'space-between' : 'flex-end' }}>
                {header}
                <Button type="text" 
                    onClick={() => close()}>
                    <AiOutlineClose />
                </Button>
            </div>
            <div style={styleOfModalBody} className={styles.modalBody}>
                {children}
            </div>
            <div className={styles.modalFooter}>
                {footer}
            </div>
        </div>
    </div>
    ) : null;

    return ReactDOM.createPortal(
        <div>
           {modalContent}
        </div>,
        document.getElementById('modal-root')!
     );
}

export default Modal