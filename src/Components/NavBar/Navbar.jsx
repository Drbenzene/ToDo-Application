import React from 'react'
import styles from './Navbar.module.css'
import {GiHamburgerMenu} from 'react-icons/gi'


function Navbar() {
  return (
    <div className={styles.navbar}>
        <div>
            <GiHamburgerMenu size="30px"/>
        </div>
        <div className={styles.webname}>
            Website Todo
        </div>
    </div>
  )
}

export default Navbar