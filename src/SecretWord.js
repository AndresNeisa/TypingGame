import React from "react";

const SecretWord = ({word ='', index}) => {

    return(
        <input className="secret-word"
        value = {[...word].map((l, i) => index.letter >= i ? l : l === ' ' ? ' ' : '_').join(" ")}
        readOnly
        />
    );
}

export default SecretWord;