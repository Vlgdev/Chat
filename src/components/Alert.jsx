import React, { useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import AlertContext from '../context/Alert/AlertContext'

/**
 * This component can display different alerts. Now it's only error
 * @component
 */
const Alert = () => {
  const { alert } = useContext(AlertContext)

  return (
    <CSSTransition
    in={alert.visible}
    timeout={300}
    classNames='alert'
    mountOnEnter
    unmountOnExit
    >
      <div className={`alert alert-${alert.type}`}>{alert.message}</div>
    </CSSTransition>
  )
}

export default Alert
