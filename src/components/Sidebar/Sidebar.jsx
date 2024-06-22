import React from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'

const Sidebar = () => {

  const [extended, setExtended] = React.useState(false);

  const toggleMenu = () => {
    setExtended(extended => !extended);
  }

  return (
    <div className="sidebar">

      <div className="top">
        <img className="menu" src={assets.menu_icon} onClick={toggleMenu}></img>
        <div className="new-chat">
          <img src={assets.plus_icon}></img>
          {extended ? <p>New Chat</p> : null}
        </div>
        
        {extended 
          ? 
        <div className="recent">
          <p className="recent-title">Recent</p>
          <div className="recent-entry">
            <img src={assets.message_icon}></img>
            <p>What is React...</p>
          </div>
        </div>
          : null
        }
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon}></img>
          {extended ? <p>Help</p> : null }
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon}></img>
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon}></img>
          {extended ? <p>Settings</p> : null }
        </div>

      </div>
      
    </div>
  )
}

export default Sidebar