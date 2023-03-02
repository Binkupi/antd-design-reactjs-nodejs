import React, { Component } from 'react';

class ClientSection extends Component {
    render() {
        return (
            <section className="clients spad wow fadeInUpBig " data-wow-duration="1s">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <span>Các đối tác</span>
                                <h2>----------------</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="/" className="client__item"><img src="img/clients/client-1.png" alt="" /></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="/" className="client__item"><img src="img/clients/client-2.png" alt="" /></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="/" className="client__item"><img src="img/clients/client-3.png" alt="" /></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="/" className="client__item"><img src="img/clients/client-4.png" alt="" /></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="/" className="client__item"><img src="img/clients/client-5.png" alt="" /></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="/" className="client__item"><img src="img/clients/client-6.png" alt="" /></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="/" className="client__item"><img src="img/clients/client-7.png" alt="" /></a>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                            <a href="/" className="client__item"><img src="img/clients/client-8.png" alt="" /></a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ClientSection;