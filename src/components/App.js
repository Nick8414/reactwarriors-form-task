import React from "react";
import InputField from './InputField';
import Steps from './Steps';
import countries from '../data/countries'
import cities from '../data/cities'

export default class App extends React.Component {

  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
      gender: 'male',
      email:'',
      mobile:'',
      country:'1',
      city:'',
      avatar:'',
      steps: [ { stepNum: 1,
                 isActive: true,
                 isCompleted:false,
                 name: 'Basic'
                },
                { stepNum: 2,
                  isActive: false,
                  isCompleted:false,
                  name: 'Contacts'
                },
                { stepNum: 3,
                  isActive: false,
                  isCompleted:false,
                  name: 'Avatar'
                },
                { stepNum: 4,
                  isActive: false,
                  isCompleted:false,
                  name: 'Finish'
                }
              ],
      errors: {}

    }
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateMobile = (mobile) => {
    var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(String(mobile).toLowerCase());
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onChangeAvatar = (event) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.setState({
        avatar: event.target.result
      })
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  getOptionsCountryItems = (items) => {
    const el = items.map(el=><option  key={el.id} value={el.id}>{el.name}</option>);
    return el;
  }

  getOptionsCityItems = (countryId, cities) => {
    return Object.keys(cities).map(el=> {
                                          return  {id:[el], ...cities[el]}
                                        })
                                        .filter(el => parseInt(countryId) === parseInt(el.country))
                                        .map(el=><option key={el.id} value={el.id} >{el.name}</option>);
  }

  previousClick = () => {
    this.setState(({steps}) => {
      const idx = steps.findIndex (el => el.isActive === true)
      const currentItem = steps[idx]
      const previousItem = steps[idx-1]
      const newCurrentItem = {...currentItem, isActive: false}
      const newPreviousItem = {...previousItem, isActive: true}

      const newArray = [
        ...steps.slice(0, idx-1),
        newPreviousItem,
        newCurrentItem,
        ...steps.slice(idx+1)
      ]

      return {  errors: {},
                steps: newArray
              }
    })
  }

  nextClick = () => {
    const errors = {};
    if (this.state.firstName.length < 5 && this.state.steps[0].isActive) errors.firstName = "Must be 5 characters or more";
    if (this.state.lastName.length < 5 && this.state.steps[0].isActive) errors.lastName = "Must be 5 characters or more";
    if (this.state.password.length < 6 && this.state.steps[0].isActive) errors.password = "Must be 6 characters or more";
    if (this.state.password !== this.state.repeatPassword) errors.repeatPassword = "Repeat password must be equal password";
    if (!this.validateEmail(this.state.email) && this.state.steps[1].isActive) errors.email = "Email is not valid;"
    if (!this.validateMobile(this.state.mobile) && this.state.steps[1].isActive) errors.mobile = "Phone is not valid;"
    if (this.state.country.length < 1 && this.state.steps[1].isActive) errors.country = "Required";
    if (this.state.city.length < 1 && this.state.steps[1].isActive) errors.city = "Required";
    if (this.state.avatar.length < 1 && this.state.steps[2].isActive) errors.avatar = "Required";

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState(({steps}) => {
        const idx = steps.findIndex (el => el.isActive === true)
        const currentItem = steps[idx]
        const nextItem = steps[idx+1]
        const newCurrentItem = {...currentItem, isActive: false, isCompleted: true}
        const newNextItem = {...nextItem, isActive: true}

        const newArray = [
          ...steps.slice(0, idx),
          newCurrentItem,
          newNextItem,
          ...steps.slice(idx+2)
        ]

        return {  errors: {},
                  steps: newArray
                }
      })
    }
  }

  resetClick = () => {
    this.setState({
      steps: [ { stepNum: 1,
        isActive: true,
        isCompleted:false,
        name: 'Basic'
       },
       { stepNum: 2,
         isActive: false,
         isCompleted:false,
         name: 'Contacts'
       },
       { stepNum: 3,
         isActive: false,
         isCompleted:false,
         name: 'Avatar'
       },
       { stepNum: 4,
         isActive: false,
         isCompleted:false,
         name: 'Finish'
       }
      ],
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
      gender: 'male',
      email:'',
      mobile:'',
      country:'1',
      city:'',
      avatar:'',
      errors: {}
    })    
  }
  
  render() {
    return (
        <div className="form-container card">
          <form className="form card-body" >
            <Steps stepsNum = {this.state.steps} />
            {
              this.state.steps[0].isActive && (
                <React.Fragment> 
                  <InputField 
                    id="firstName"
                    labelName="First name"
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    value={this.state.firstName}
                    changeEvent={this.onChange}
                    error={this.state.errors.firstName}
                  />

                  <InputField 
                    id="lastName"
                    labelName="Last name"
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    value={this.state.lastName}
                    changeEvent={this.onChange}
                    error={this.state.errors.lastName}
                  />

                  <InputField 
                    id="password"
                    labelName="Password"
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={this.state.password}
                    changeEvent={this.onChange}
                    error={this.state.errors.password}
                  />

                  <InputField 
                    id="repeatPassword"
                    labelName="Repeat password"
                    type="password"
                    placeholder="Repeat password"
                    name="repeatPassword"
                    value={this.state.repeatPassword}
                    changeEvent={this.onChange}
                    error={this.state.errors.repeatPassword}
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
                        checked={this.state.gender === "male"}
                        onChange={this.onChange}
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
                        checked={this.state.gender === "female"}
                        onChange={this.onChange}
                      />
                      <label className="form-check-label" htmlFor="female"  >
                        Female
                      </label>
                    </div>
                  </fieldset>
                </React.Fragment>
              )
            }
        
            { 
              this.state.steps[1].isActive && ( 
                <React.Fragment>
                  <InputField 
                    id="email"
                    labelName="Email"
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    value={this.state.email}
                    changeEvent={this.onChange}
                    error={this.state.errors.email}
                  />
                  <InputField 
                    id="mobile"
                    labelName="Mobile"
                    type="text"
                    placeholder="Enter mobile"
                    name="mobile"
                    value={this.state.mobile}
                    changeEvent={this.onChange}
                    error={this.state.errors.mobile}
                  />
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      className="form-control"
                      id="country"
                      value={this.state.country}
                      name="country"
                      onChange={this.onChange}
                    >
                      { this.getOptionsCountryItems(countries) }
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <select
                      className="form-control"
                      id="city"
                      value={this.state.city}
                      name="city"
                      onChange={this.onChange}
                    >
                      <option value='' >Select city</option>
                      { this.getOptionsCityItems(this.state.country, cities) }
                    </select>
                    { this.state.errors.city && <div className="invalid-feedback"> {this.state.errors.city} </div> }
                  </div>
                </React.Fragment>
              )
            }

            {
              this.state.steps[2].isActive && (

                <React.Fragment>
                  <img className="mb-4" width="100%" src={this.state.avatar !== '' ? this.state.avatar : require('../static/default-avatar.59337bae.png')} alt="avatar img" ></img>
                    <div className="input-group mb-3">
                      <div className="custom-file">
                        <input 
                          type="file" 
                          name="avatar" 
                          className="custom-file-input" 
                          id="avatar" 
                          aria-describedby="avatar"
                          onChange={this.onChangeAvatar} 
                        />
                        <label 
                          className="custom-file-label" 
                          htmlFor="avatar"
                        >Choose avatar</label>
                      </div>
                      { this.state.errors.avatar && <div className="invalid-feedback"> {this.state.errors.avatar} </div> }
                    </div>
                </React.Fragment>
              )
            }

            {
              this.state.steps[3].isActive && (
                <React.Fragment>
                  <div className="row mb-4">
                    <div className="col-4">
                      <img className="mb-4" width="100%" src={this.state.avatar} alt="avatar img" ></img>
                    </div>
                    <div className="col-8 d-flex align-items-center">
                      <h4>{this.state.firstName} {this.state.lastName}</h4>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-12">
                      <p><strong>Email: </strong>{this.state.email}</p>
                      <p><strong>Mobile: </strong>{this.state.mobile}</p>
                      <p><strong>Location: </strong> {countries[countries.findIndex(el=> el.id === parseInt(this.state.country))].name}, {cities[this.state.city].name }</p>
                    </div>
                  </div>
                </React.Fragment>
              )
            }

            <div className="d-flex justify-content-center "> 
              {this.state.steps[3].isActive === false && <button type="button" className="btn btn-light w-30 mr-4" disabled = {this.state.steps[0].isActive} onClick={this.previousClick}>
                Previous
              </button> }
              
              {this.state.steps[3].isActive === false && <button type="button" className="btn btn-secondary w-30" onClick={this.nextClick}>
                Next
              </button>
              }

              {this.state.steps[3].isActive === true && <button type="button" className="btn btn-primary w-30" onClick={this.resetClick}>
                Reset
              </button>}
            </div>
          </form>
        </div>
    );
  }
}
