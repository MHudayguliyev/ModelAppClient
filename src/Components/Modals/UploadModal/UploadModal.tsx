import React from 'react'
import { uploadModel } from "../../../api/queries/Posts";
import { useTranslation } from "react-i18next";
//toast 
import toast from 'react-hot-toast'
//css 
import styles from './UploadModal.module.scss'
// comp libs
import Modal from '@compLib/Modal/Modal'
import Button from '@compLib/Button/Button'
//redux 
import {deleteAdminData} from '@redux/actions/AdminAction'

type UploadModalProps = {
    setIsOpen: any,
    isOpen: boolean
    dispatch: Function,
    modelId: string | any
}

const UploadModal = (props: UploadModalProps) => {
    const { setIsOpen, isOpen, dispatch, modelId } = props
    const {t} = useTranslation()

    const upload = async (id: string) => {
        try {
          console.log('id', id)
          const res: any = await uploadModel(id)
          if(res.status===200){
            dispatch(deleteAdminData(id))
            toast.success('Model successfully uploaded')
            setIsOpen(false)
          }

          } catch (error) {
            console.log(error)
        }
    } 

  return (
    <>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)} className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTxt}>{t('sure')}</div>
        </div>

        <div className={styles.btnGroup}>
          <Button onClick={() => upload(modelId)} color='orange' type='contained' rounded>{t('yes')}</Button>
          <Button onClick={() => setIsOpen(false)} type='contained' rounded>{t('no')}</Button>
        </div>
      </Modal>
    </>
  )
}

export default UploadModal



      // <div className='uploadDarkBG' onClick={() => setIsOpen(false)} />
      // <div className='uploadCentered'>
      //   <div className='uploadModal'>
      //     <div className='uploadModalHeader'>
      //       <h5 className='uploadModalHeading'>Dialog</h5>
      //     </div>
      //     <button className='uploadModalCloseBtn' onClick={() => setIsOpen(false)}>
      //       <RiCloseLine style={{ marginBottom: "-3px" }} />
      //     </button>
      //     <div className='uploadModalContent'>
      //       Are you sure you want to upload the item?
      //     </div>
      //     <div className='uploadModalActions'>
      //       <div className='uploadModalActionsContainer'>
      //         <button className='uploadModalUploadBtn' onClick={e => UploadModel(modelId, e)}>
      //           Yes
      //         </button>
      //         <button
      //           className='uploadModalCancelBtn'
      //           onClick={() => setIsOpen(false)}
      //         >
      //           No
      //         </button>
      //       </div>
      //     </div>
      //   </div>
      // </div>