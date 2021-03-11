import React from "react";

const SecretWord = ({word ='', index}) => {

    return(
        <div className="secret-word-container">
            <p className="secret-word">
                {[...word].map((l, i) => index.letter >= i ? l : l === ' ' ? ' ' : '_').join(" ")}
            </p>
            <input className="hidden-text"></input>
        </div>
        
    );
}

export default SecretWord;