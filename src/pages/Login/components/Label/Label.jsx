import React from 'react';
import './Label.css'

const Label = (props) =>{
    //destructuring
    const { text } = props;
    return(
        <div className='label-container'>
            <label className='label-text'> {text} </label>
        </div>
    )
};

export default Label;