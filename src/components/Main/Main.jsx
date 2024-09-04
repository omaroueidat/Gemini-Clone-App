import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import {Context} from '../context/Context'

const Main = () => {


    const {onSent, recentPrompt, showResult, loading, resultData, input, setInput} = useContext(Context);

    
    const changeText = (event) => {
        setInput(e.target.value);
    }

    const handleKeyInput = (event) => {
        if (event.key === 'Enter' && input){
            onSent(input);
        }
    }

  return (
    <div className="main">

        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>

        <div className="main-container">

            {!showResult
            ?
                // If there is no chat yet, display greeting message and cards with suggestions
            <>
                <div className="greet">
                    <p><span>Hello, Dev</span></p>
                    <p>How Can I help you today</p>
                </div>
            

                <div className="cards">

                    <div className="card">
                        <p>Test Testasdasdasdasdasd</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>

                    <div className="card">
                        <p>Test Testasdasdasdasdasd</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>

                    <div className="card">
                        <p>Test Testasdasdasdasdasd</p>
                        <img src={assets.message_icon} alt="" />
                    </div>

                    <div className="card">
                        <p>Test Testasdasdasdasdasd</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                </>
            :
                // Else we have to display the chat
            <>
                <div className='result'>

                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        {/* This will have the user's question before the response */}
                        <p>{recentPrompt}</p>
                    </div>

                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="gemini"/>
                        {loading 
                            // If the response is not yet recieved, then put a loading animation to the user
                        ?
                        <>
                            <div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div>
                        </>
                            // Else make display the response
                        :
                            <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }   
                    </div>

                </div>
            </>
            }

            

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyInput} value={input} type="text" placeholder='Enter a prompt here' />

                    <div>
                       <img src={assets.gallery_icon} alt="" /> 
                       <img src={assets.mic_icon} alt="" /> 
                       {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                    </div>

                </div>

                <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps    
                </p>
            </div>

        </div>

    </div>
  )
}

export default Main