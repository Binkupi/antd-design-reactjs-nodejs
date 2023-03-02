import React, { Component } from 'react';

class Map extends Component {
    render() {
        return (
            <div className="map ">
                <iframe title="map"  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3918.2321520912697!2d106.80214512771671!3d10.869939464932909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1622738707740!5m2!1svi!2s" height={500} style={{border: 0}} allowFullScreen aria-hidden="false" tabIndex={0}></iframe>
            </div>
        );
    }
}

export default Map;