import React from 'react'
import styles from "./Footer.module.scss"

import mic from '../../assets/images/mic.png'

const Footer = () => {
  return (
    <>
      <div className={styles.footer__container}>
        <div className={styles.header}>
          <div className={styles.mainContent}>
            <h2>Rules</h2>
            <h2>Tech support</h2>
            <h2>FAQ</h2>
          </div>

          <span>Copyright&#169;All right are reserved</span>
        </div>

        <div className={styles.body}>
          <h2>Sell with us</h2>
          <p>Free 3d Models</p>
          <p>Premium 3d Models</p>
        </div>

        <div className={styles.footer}>
          <div className={styles.mic}>
            <img src={mic} className={styles.micIcon}/>
          </div>

          <div className={styles.contacts}>
            <span>@email.com</span> <br></br>
            <span>blabla.ru 2023</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer