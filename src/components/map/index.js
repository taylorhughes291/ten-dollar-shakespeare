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

    const loaded = () => {
        return (
            <div id='map-cont' style={{ height: '500px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_API_KEY}}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    {props.entries.filter((item, index) => {
                        return item.theaterLocation
                    }).map((item, index) => {
                        return (
                            <Marker
                                key={index}
                                lat={item.theaterLocation.lat}
                                lng={item.theaterLocation.lon}
                                place={item}
                                setMarker={setWhichMarker}
                                show={whichMarker === item.id ? true : false}
                                id={item.id}
                            />
                        )
                    })}
                </GoogleMapReact>
            </div>
        )
    }

    const loading = () => {
        return (
            <h3>Loading...</h3>
        )
    }

    return props.entries.length > 0 ? loaded() : loading()
}

export default Map