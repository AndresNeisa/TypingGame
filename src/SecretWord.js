import React from "react";

const SecretWord = ({word ='', index, handleInput}) => {

    return(
        <div className="secret-word-container">
            <p className="secret-word">
                {[...word].map((l, i) => index.letter >= i ? l : l === ' ' ? ' ' : '_').join(" ")}
            </p>
            <input className="hidden-text" onChange={handleInput}></input>
        </div>
        
    );
}

export default SecretWord;