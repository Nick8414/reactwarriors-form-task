import React from 'react'
import classNames from 'classnames';

const InputField = ({id, labelName, type, placeholder, name, value, changeEvent, error}) => {
  return(
        <div className="form-group">
        <label>{labelName}</label>
        <input
          id={id}
          type={type}
          className={ error ? classNames("form-control", "invalid-feedback-input-border") : classNames("form-control") } 
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={changeEvent}
        />
       { error && <div className="invalid-feedback"> {error} </div> }
      </div>
    ) 
}

export default InputField;