import React from 'react';
import classNames from 'classnames';

const Steps = (props) => {
  return (
    <div className="steps mb-4" >
      { props.number.map(el => {
      	return ( 
      	<React.Fragment key={el.number}>
          	<div className={ classNames({'step': true, 'is-active': el.isActive, 'is-completed': el.isCompleted }) }>
            	<div className="step__marker">{el.number}</div>
          	  <div className="step__title mt-1">{el.name}</div>
        	  </div>
      	</React.Fragment> 
      	)
	    }) }
	  </div> 
	);
}

export default Steps;