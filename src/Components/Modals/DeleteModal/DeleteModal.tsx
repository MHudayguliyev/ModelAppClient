import React from 'react'
import { useTranslation } from 'react-i18next';
/// toast 
import toast from 'react-hot-toast'
// posts 
import { deleteUnacceptedModel } from '../../../api/queries/Posts';
/// modal 
import Modal from "@app/compLibrary/Modal/Modal";
/// css
import styles from './DeleteModal.module.scss'
import Button from '@app/compLibrary/Button/Button';
/// redux 
import {deleteAdminData} from '@redux/actions/AdminAction'

type DeleteModalProps = {
    setIsOpen: Function,
    isOpen: boolean
    dispatch: Function,
    modelId: string,
}

const DeleteModal = (props: DeleteModalProps) => {
    const { setIsOpen, isOpen, dispatch, modelId } = props
    const {t} = useTranslation()

    const Delete = async (id: string) => {
        const res: any = await deleteUnacceptedModel(id)
        console.log('res', res)
        if(res.status == 200){
            setIsOpen(false)
            dispatch(deleteAdminData(id))
            toast.success(`Model successfully deleted!`)
        }else {
            toast.error('Failed to delete')
        }
    }

  return (
    <>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)} className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTxt}>{t('sure')}</div>
        </div>

        <div className={styles.btnGroup}>
          <Button onClick={() => Delete(modelId)} color='red' type='contained' rounded>{t('deleteTxt')}</Button>
          <Button onClick={() => setIsOpen(false)} type='contained' rounded>{t('cancelTxt')}</Button>
        </div>

      </Modal>
    </>
  )
}

export default DeleteModal