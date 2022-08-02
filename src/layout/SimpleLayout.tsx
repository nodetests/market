import React from 'react'

import styles from './index.module.less'

function SimpleLayout(props: any) {
  const { children } = props
  return (
    <div className={styles.layout}>
      <div className={styles.bgi} />
      <div>{children}</div>
    </div>
  )
}

export default SimpleLayout
