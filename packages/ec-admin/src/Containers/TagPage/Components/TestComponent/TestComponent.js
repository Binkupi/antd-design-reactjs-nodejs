import React from 'react'

const TestComponent=(props)=>{

    return (
        <>  
            <h3><span><i className="fas fa-user-plus"></i></span>{props.name}</h3>
            <button className="btn btn-primary" onClick={props.onToggleStatus}>Toggle status</button>
        </>  
    );
}

export default TestComponent;
