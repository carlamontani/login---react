import React from 'react';
import './Input.css'

const Input = ({ attribute, handleChange, param }) =>{
    return(
        <div className='input-container'>
            <input
            id= {attribute.id}
            name= {attribute.name}
            type= {attribute.type}
            placeholder= {attribute.placeholder}
            onChange= { (e) => handleChange(e.target.name, e.target.value) }
            className= { param ? 'input-error' : 'regular-style' }   
   
            />
        </div>
    )
};

export default Input;