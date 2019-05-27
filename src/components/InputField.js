import React from 'react'

const InputField = ({id, labelName, type, placeholder, name, value, changeEvent, error}) => {
  return(
        <div className="form-group">
        <label>{labelName}</label>
        <input
          id={id}
          type={type}
          className={ error ? "form-control invalid-feedback-input-border" : "form-control" } 
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