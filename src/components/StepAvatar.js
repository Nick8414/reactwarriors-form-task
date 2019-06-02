import React from 'react';

export default class StepAvatar extends React.Component {

	onChangeAvatar = (event) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			this.props.onChange({
				target: {
					name: 'avatar',
					value: event.target.result
				}
			})
		}
		reader.readAsDataURL(event.target.files[0]);
	}
	
	render() {
		const {avatar, errors} = this.props
		return (
		<React.Fragment>
		<img className="mb-4" width="100%" src={avatar !== '' ? avatar : require('../static/default-avatar.59337bae.png')} alt="avatar img" ></img>
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
    		{ errors.avatar && <div className="invalid-feedback"> {errors.avatar} </div> }
  		</div>
	</React.Fragment>
	)
	}
}
  

