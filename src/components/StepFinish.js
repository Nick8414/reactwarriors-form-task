import React from 'react';
import countries from '../data/countries';
import cities from '../data/cities';

const StepFinish = ({avatar, firstName, lastName, email, mobile, country, city}) => (
  <React.Fragment>
    <div className="row mb-4">
      <div className="col-4">
        <img className="mb-4" width="100%" src={avatar} alt="avatar img" ></img>
      </div>
      <div className="col-8 d-flex align-items-center">
        <h4>{firstName} {lastName}</h4>
      </div>
    </div>
    <div className="row mb-4">
      <div className="col-12">
        <p><strong>Email: </strong>{email}</p>
        <p><strong>Mobile: </strong>{mobile}</p>
        <p><strong>Location: </strong> {countries[countries.findIndex(el=> el.id === parseInt(country))].name}, {cities[city].name }</p>
      </div>
    </div>
  </React.Fragment>
)

export default StepFinish;
