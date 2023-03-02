import React, { Component } from 'react';
import ContactText from './ContactText';
import ContactImg from './ContactImg';

class ContactSection extends Component {
    render() {
        return (
            <section className="contact spad contact__text">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <ContactText />
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <ContactImg />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ContactSection;