import React from 'react'

import styles from './formList.module.css'

export default function FormList({ forms }) {
  const formList = forms.toUpperCase().split('')
  return (
    <div className="d-flex form-list">
      {
        formList.map((game, idx) => {
          const classes = [styles.formListItem]
          if (game === 'W')
            classes.push(styles.win)
          else if (game === 'L')
            classes.push(styles.lose)
          else
            classes.push(styles.draw)
          return (
            <div key={idx} className={classes.join(' ')}>
              { game }
            </div>)
        })
      }
    </div>
  )
}