import React from 'react'
import TestComponent from './TestComponent';

const TestContainer=(props)=>{
    

    return (
        <>  
            <TestComponent onToggleStatus={props.onToggleStatus} name="Binkupi"/>
        </>  
    );
}

export default TestContainer;
