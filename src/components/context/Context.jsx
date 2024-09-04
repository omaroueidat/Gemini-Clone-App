import React from "react";
import run from "../../config/gemini";

export const Context = React.createContext();

const ContextProvider = (props) => {

    const [input, setInput]  = React.useState("");
    const [recentPrompt, setRecentPrompt] = React.useState("");
    const [previousPrompt, setPreviousPrompt] = React.useState([]);
    const [showResult, setShowResult] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [resultData, setResultData] = React.useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function() {
            setResultData(prev => prev + nextWord)
        }, 75*index)
    }

    const customizeResponse = (response) => {
        let responseArray = response.split("**");
        let newResponse = "";

        // after splitting the string, the bolded text will always be in the odd index
        for (let i=0; i < responseArray.length; i++){
            
            // if the index is even
            if (i % 2 === 0){
                newResponse += responseArray[i];
            } else{
                newResponse += `<b>${responseArray[i]}</b>`;
            }
        }

        // Add break lines when we encounter a * between words
        newResponse = newResponse.split('*').join('<br />');

        // Add word by word to the result data
        newResponse = newResponse.split(" ");

        for (let i=0; i < newResponse.length; i++){
            delayPara(i, newResponse[i] + " ");
        }
    }

    const onSent = async (prompt) => {

        // Delete the previous response
        setResultData("");

        // Setting loading animation
        setLoading(true);

        // Setting that the user has started chatting to remove the greeting page
        setShowResult(true);

        let response;
        if (prompt != undefined){
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else{
            setPreviousPrompt(prev => [...prev, input]);
            
            // Set the user's input so that he can see his question before the response
            setRecentPrompt(input);

            response = await run(input)
        }


        // Return the result word by word
        customizeResponse(response);

        // Remove loading animation after setting the result
        setLoading(false);

        // Remove the user input
        setInput("");
    }

    const contextValue = {
        previousPrompt, 
        setPreviousPrompt,
        recentPrompt,
        setRecentPrompt,
        showResult,
        setShowResult,
        input,
        setInput,
        loading, 
        setLoading,
        resultData,
        setResultData,
        onSent        
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;