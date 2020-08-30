import React from 'react'

/**
 * This loader is displayed when messages haven't loaded yet
 * @component
 */
const ChatLoader = () => (
  <div className="chat-loader">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
)

export default ChatLoader
