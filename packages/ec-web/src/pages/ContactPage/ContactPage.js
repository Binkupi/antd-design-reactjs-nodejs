import React, { Component,Fragment } from 'react';
import Map from './Map';
import ContactSection from './ContactSection'
import {Helmet} from 'react-helmet'
import WOW from 'wowjs'
import SearchContainer from '../../containers/SearchContainer';
class ContactPage extends Component {
    componentDidMount() {
        new WOW.WOW({
            live: false
        }).init(); 
    }
    render() {
        return (
            <Fragment> 
            <div>
                <Helmet>
                    <title>Thông tin liên hệ</title>
                </Helmet>
                {/* Map Begin */}
                <Map />
                {/* Map End */}
                {/* Contact Section Begin */}
                <ContactSection />
                {/* Contact Section End */}
                
            </div>
            <SearchContainer history={this.props.history}/>
            </Fragment> 
            
        );
    }
}

export default ContactPage;