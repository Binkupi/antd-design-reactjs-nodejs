import React, { Component,Fragment } from 'react';
import Breadcrumb from './Breadcrumb';
import AboutSection from './AboutSection';
import TestimonialSection from './TestimonialSection'
import CounterSection from './CounterSection'
import TeamSection from './TeamSection'
import ClientSection from './ClientSection'
import {Helmet} from 'react-helmet'
import SearchContainer from '../../containers/SearchContainer';

class AboutPage extends Component {
    
    render() {
        return (
            <Fragment>  
            <div>
                <Helmet>
                    <title>Về chúng tôi</title>
                </Helmet>

                {/* Breadcrumb Section Begin */}
                    <Breadcrumb breadcrumbs={
                        [ 'Trang chủ', 'Về chúng tôi' ]}
                    />
                {/* Breadcrumb Section End */}
                {/* About Section Begin */}
                <AboutSection/>
                {/* About Section End */}
                {/* Testimonial Section Begin */}
                <TestimonialSection />
                {/* Testimonial Section End */}
                {/* Counter Section Begin */}
                <CounterSection />
                {/* Counter Section End */}
                {/* Team Section Begin */}
                <TeamSection />
                {/* Team Section End */}
                {/* Client Section Begin */}
                <ClientSection />
                {/* Client Section End */}
                
            </div>
            <SearchContainer history={this.props.history}/>
            </Fragment> 
        );
    }
}

export default AboutPage;