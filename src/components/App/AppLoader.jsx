import React from 'react'

/**
 * This loader is activating when user connect to the app
 * @component
 */
const AppLoader = () => {
  return (
    <div className="app-loader">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="loader-note">Пожалуйста подождите. Выполняется вход</div>
    </div>
  )
}

export default AppLoader
