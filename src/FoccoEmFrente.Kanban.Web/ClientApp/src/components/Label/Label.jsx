import React from 'react';
// import './style.css

function Label({ text, htmlFor }) {
    return (
        <div>
            <label htmlFor={ htmlFor }>{ text }</label>
        </div>
    );
}

export default Label;
