import React from 'react';
import './style.css';

function InputText({ type, text, icon, onChange }) {

    return (
        <div className="input">
            <img src={icon} alt={text} />
            <input type={type} placeholder={text} onChange={onChange}/>
        </div>
    );
}

export default InputText;
