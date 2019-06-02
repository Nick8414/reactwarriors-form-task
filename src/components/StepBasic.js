import React from 'react';
import InputField from './InputField';

const StepBasic = ({firstName, lastName, password, repeatPassword, gender, onChange, errors}) => (
    <React.Fragment> 
      <InputField 
        id="firstName"
        labelName="First name"
        type="text"
        placeholder="Enter first name"
        name="firstName"
        value={firstName}
        changeEvent={onChange}
        error={errors.firstName}
      />

      <InputField 
        id="lastName"
        labelName="Last name"
        type="text"
        placeholder="Enter last name"
        name="lastName"
        value={lastName}
        changeEvent={onChange}
        error={errors.lastName}
      />

      <InputField 
        id="password"
        labelName="Password"
        type="password"
        placeholder="Enter password"
        name="password"
        value={password}
        changeEvent={onChange}
        error={errors.password}
      />

      <InputField 
        id="repeatPassword"
        labelName="Repeat password"
        type="password"
        placeholder="Repeat password"
        name="repeatPassword"
        value={repeatPassword}
        changeEvent={onChange}
        error={errors.repeatPassword}
      />

      <fieldset className="form-group">
        <div>Gender</div>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="radio" 
            id="male" 
            name="gender" 
            value="male"
            checked={gender === "male"}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor="male"  >
            Male
          </label>
        </div>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="radio" id="female" 
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor="female"  >
            Female
          </label>
        </div>
      </fieldset>
    </React.Fragment>
)

export default StepBasic;