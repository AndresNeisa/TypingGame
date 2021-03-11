import React from "react";

const SecretWord = ({word ='', index, handleMobileInput}) => {

    return(
        <div className="secret-word-container">
            <p className="secret-word">
                {[...word].map((l, i) => index.letter >= i ? l : l === ' ' ? ' ' : '_').join(" ")}
            </p>
            <input value='' className="hidden-text" onChange={(event) => handleMobileInput(event.target.value)}></input>
        </div>
        
    );
}

export default SecretWord;