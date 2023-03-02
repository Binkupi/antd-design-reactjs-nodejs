import React, { Component } from 'react';
import {Helmet} from 'react-helmet'

class Application extends Component {
    render() {
        return (
            <div className="application">
                <Helmet>
                    <title>My Title</title>
                </Helmet>
            </div>
        );
    }
}

export default Application;