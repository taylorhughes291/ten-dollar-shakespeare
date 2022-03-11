import dateFormat from 'dateformat'

const Marker = (props) => {
    /////////////////
    // Constants
    /////////////////

    const markerStyle = {
      border: '1px solid white',
      borderRadius: '50%',
      height: 10,
      width: 10,
      backgroundColor: props.show ? 'red' : 'blue',
      cursor: 'pointer',
      zIndex: 10,
    };

    ///////////////////
    // Functions
    ///////////////////

    const InfoWindow = (props) => {
        const { place } = props;
        const infoWindowStyle = {
          position: 'relative',
          bottom: 150,
          left: '-45px',
          width: 220,
          backgroundColor: 'white',
          boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
          padding: 10,
          fontSize: 14,
          zIndex: 100,
        };
      
        return (
          <div style={infoWindowStyle}>
            <div style={{ fontSize: 16 }}>
              {place.title}
            </div>
            <div style={{ fontSize: 14 }}>
              <span style={{ color: 'grey' }}>
                {dateFormat(place.dateOfProduction, 'ddd m/d/yy h:MM TT')}
              </span>
            </div>
            <div style={{ fontSize: 14 }}>
              <span style={{ color: 'grey' }}>
                {`${place.address}, ${place.city} ${place.state} ${place.zip}`}
              </span>
            </div>
            <div style={{ fontSize: 14 }}>
              <span style={{ color: 'grey' }}>
                {`$${place.cost}`}
              </span>
            </div>
          </div>
        );
      };


    ////////////////////
    // Render
    ////////////////////
  
    return (
      <>
        <div 
            style={markerStyle}
            onClick={() => props.setMarker(props.id)}
        />
        {props.show && <InfoWindow place={props.place} />}
      </>
    );
};

export default Marker