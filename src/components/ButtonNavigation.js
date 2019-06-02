import React from 'react';

const ButtonNavigation = ({steps, previousClick, nextClick, resetClick}) => (
  <div className="d-flex justify-content-center "> 
    {steps[3].isActive === false && 
			<button type="button" className="btn btn-light w-30 mr-4" disabled = {steps[0].isActive} onClick={previousClick}>
      	Previous
    	</button> }
              
    {steps[3].isActive === false && 
			<button type="button" className="btn btn-secondary w-30" onClick={nextClick}>
        Next
      </button>}

    {steps[3].isActive === true && 
			<button type="button" className="btn btn-primary w-30" onClick={resetClick}>
        Reset
      </button>}
  </div>
)

export default ButtonNavigation;