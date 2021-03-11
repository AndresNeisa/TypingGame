import React from "react";

const SecretWord = ({word ='', index}) => {

    return(
        <p className="secret-word">
        {[...word].map((l, i) => index.letter >= i ? l : l === ' ' ? ' ' : '_ ')}
        </p>
    );
}

export default SecretWord;