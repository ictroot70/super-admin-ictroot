<<<<<<< HEAD
import styles from './Loading.module.scss'
export const Loading = () => {
  return <span className={styles.loader}></span>
=======
import React from 'react'

import styles from './Loading.module.scss'

interface Props {
  size?: number
}
export const Loading = (props: Props) => {
  const { size } = props

  return <span style={{ fontSize: size }} className={styles.loader}></span>
>>>>>>> a335f62af2bdb69c73f13cba647562248247d6ba
}
