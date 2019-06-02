import React from "react";
import Steps from './Steps';
import StepBasic from './StepBasic';
import StepContacts from './StepContacts';
import StepAvatar from './StepAvatar';
import StepFinish from './StepFinish';
import ButtonNavigation from './ButtonNavigation';

import * as validators from '../helpers/validators'

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
      activeStep:0,
      steps: [ { number: 1,
                 isActive: true,
                 isCompleted:false,
                 name: 'Basic'
                },
                { number: 2,
                  isActive: false,
                  isCompleted:false,
                  name: 'Contacts'
                },
                { number: 3,
                  isActive: false,
                  isCompleted:false,
                  name: 'Avatar'
                },
                { number: 4,
                  isActive: false,
                  isCompleted:false,
                  name: 'Finish'
                }
              ],
      errors: {}
    }
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  previousClick = () => {
    const newSteps = [...this.state.steps];
    const newActiveStep = this.state.activeStep - 1;
    newSteps[this.state.activeStep].isActive = false;
    newSteps[newActiveStep].isActive = true;

    this.setState({ errors: {},
                    steps: newSteps,
                    activeStep: newActiveStep
                  })
  }

  getErrorsByValues = () => {
    let errors = {};

    switch(this.state.activeStep) {
      case 0:
          if (this.state.firstName.length < 5 ) errors.firstName = "Must be 5 characters or more";
          if (this.state.lastName.length < 5 && this.state.steps[0].isActive) errors.lastName = "Must be 5 characters or more";
          if (this.state.password.length < 6 && this.state.steps[0].isActive) errors.password = "Must be 6 characters or more";
          if (this.state.password !== this.state.repeatPassword) errors.repeatPassword = "Repeat password must be equal password";
        break;
      case 1:
          if (!validators.validateEmail(this.state.email)) errors.email = "Email is not valid;"
          if (!validators.validateMobile(this.state.mobile)) errors.mobile = "Phone is not valid;"
          if (this.state.country.length < 1 ) errors.country = "Required";
          if (this.state.city.length < 1 ) errors.city = "Required";
        break;
      case 2:
          if (this.state.avatar.length < 1) errors.avatar = "Required";
        break;
    }
    return errors;
  }

  nextClick = () => {
    const errors = this.getErrorsByValues();
  
    if (Object.keys(errors).length > 0) {
      this.setState({
        errors
      });
    } else {
      const newSteps = [...this.state.steps];
      const newActiveStep = this.state.activeStep + 1;
      newSteps[this.state.activeStep].isActive = false;
      newSteps[this.state.activeStep].isCompleted = true;
      newSteps[newActiveStep].isActive = true;

      this.setState({ errors: {},
                      steps: newSteps,
                      activeStep: newActiveStep
                    })
    }
  }

  resetClick = () => {
    this.setState({
      steps: [ { number: 1,
        isActive: true,
        isCompleted:false,
        name: 'Basic'
       },
       { number: 2,
         isActive: false,
         isCompleted:false,
         name: 'Contacts'
       },
       { number: 3,
         isActive: false,
         isCompleted:false,
         name: 'Avatar'
       },
       { number: 4,
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
            <Steps number = {this.state.steps} />
            {
              this.state.steps[0].isActive && 
              <StepBasic 
                firstName      = {this.state.firstName}
                lastName       = {this.state.lastName}
                password       = {this.state.password}
                repeatPassword = {this.state.repeatPassword}
                gender         = {this.state.gender}
                onChange       = {this.onChange}
                errors         = {this.state.errors}
              />
            }
            { 
              this.state.steps[1].isActive && 
              <StepContacts
                email    = {this.state.email}
                mobile   = {this.state.mobile}
                country  = {this.state.country}
                city     = {this.state.city}
                onChange = {this.onChange}
                errors   = {this.state.errors}
              />
            }
            {
              this.state.steps[2].isActive && 
              <StepAvatar
                avatar   = {this.state.avatar}
                onChange = {this.onChange}
                errors   = {this.state.errors}
              />
            }
            {
              this.state.steps[3].isActive && 
              <StepFinish
                firstName = {this.state.firstName}
                lastName  = {this.state.lastName}
                email     = {this.state.email}
                mobile    = {this.state.mobile}
                country   = {this.state.country}
                city      = {this.state.city}
                avatar    = {this.state.avatar}
              />
            }
            <ButtonNavigation
              steps={this.state.steps}
              nextClick={this.nextClick}  
              previousClick={this.previousClick}
              resetClick={this.resetClick}
            />
          </form>
        </div>
    );
  }
}
