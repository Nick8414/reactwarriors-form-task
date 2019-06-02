import React from 'react';
import InputField from './InputField';
import countries from '../data/countries';
import cities from '../data/cities';

const getOptionsCountryItems = (items) =>
  items.map(el=> (
    <option  key={el.id} value={el.id}>
      {el.name}
    </option>
  ));
	
const getOptionsCityItems = (countryId, cities) => 
                                      Object.keys(cities)
                                      .reduce((acc, el)=> {
                                        let cityObject = {id:[el], ...cities[el]}
                                        if (parseInt(countryId) === parseInt(cityObject.country)) {
                                          acc.push(<option key={cityObject.id} value={cityObject.id} >{cityObject.name}</option>)
                                        }
                                        return acc;
                                      }, [])
																			
const StepContacts = ({email, mobile, country, city, errors, onChange}) => (
    <React.Fragment>
      <InputField 
        id="email"
        labelName="Email"
        type="text"
        placeholder="Enter email"
        name="email"
        value={email}
        changeEvent={onChange}
        error={errors.email}
      />
      <InputField 
        id="mobile"
        labelName="Mobile"
        type="text"
        placeholder="Enter mobile"
        name="mobile"
        value={mobile}
        changeEvent={onChange}
        error={errors.mobile}
      />
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select
          className="form-control"
          id="country"
          value={country}
          name="country"
          onChange={onChange}
        >
          { getOptionsCountryItems(countries) }
        </select>
      </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <select
            className="form-control"
            id="city"
            value={city}
            name="city"
            onChange={onChange}
          >
            <option value='' >Select city</option>
            { getOptionsCityItems(country, cities) }
          </select>
          { errors.city && <div className="invalid-feedback"> {errors.city} </div> }
        </div>
      </React.Fragment>
)

export default StepContacts;