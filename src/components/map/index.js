import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import Marker from '../mapMarker'

const Map = (props) => {
    ////////////////
    // Constants
    ////////////////

    const [whichMarker, setWhichMarker] = useState('')

    const defaultProps = {
        center: {
          lat: 34.447933,
          lng: -118.353919
        },
        zoom: 7
      };

    ////////////////
    // Functions
    ////////////////
      



    ////////////////
    // Render
    ////////////////

    return (
        <div id='map-cont' style={{ height: '500px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_API_KEY}}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {props.entries.filter((item, index) => {
                    return item.fields.theaterLocation
                }).map((item, index) => {
                    return (
                        <Marker
                            key={index}
                            lat={item.fields.theaterLocation.lat}
                            lng={item.fields.theaterLocation.lon}
                            place={item.fields}
                            setMarker={setWhichMarker}
                            show={whichMarker === item.sys.id ? true : false}
                            id={item.sys.id}
                        />
                    )
                })}
            </GoogleMapReact>
        </div>
    )
}

export default Map