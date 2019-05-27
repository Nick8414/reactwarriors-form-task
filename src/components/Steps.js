import React from 'react';

const Steps = (props) => {

    

    const elements = props.stepsNum.map(el => {
        let classStr = 'step'; 
        if (el.isActive)  classStr = classStr + ' is-active'
        if (el.isCompleted)  classStr = classStr + ' is-completed'

        return ( 
        <React.Fragment key={el.stepNum}>
            <div  className={classStr}>
                <div className="step__marker">{el.stepNum}</div>
                <div className="step__title mt-1">{el.name}</div>
            </div>
        </React.Fragment> 
        )
        
    })


    return <div className="steps mb-4" >{ elements }</div>
}

export default Steps;