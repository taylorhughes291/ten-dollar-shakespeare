import dateFormat from 'dateformat'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

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
          bottom: 100,
          left: '30px',
          width: 220,
          backgroundColor: 'white',
          boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
          padding: 10,
          fontSize: 14,
          zIndex: 100,
        };
      
        return (
          <div 
            style={infoWindowStyle}
          >
            <div 
              style={{ fontSize: 16 }}
              className='marker-header'
            >
              {`${place.title} - $${place.cost}`}
              <FontAwesomeIcon
                style={{cursor: 'pointer'}}
                icon={faX}
                color='grey'
                size='x'
                onClick={() => props.setMarker('')}
              />
            </div>
            <div 
              style={{ fontSize: 14 }}
              className='marker-text'
            >
              {place.datesOfProduction.map((item, index) => {
                return (
                  <Link
                    to={`/upcoming/${item.id}`}
                  >
                    <p 
                      style={{ color: 'grey' }}
                      className='marker'
                    >
                      {dateFormat(item.date, 'ddd m/d/yy h:MM TT')}
                    </p>
                  </Link>
                )
              })
              }
            </div>
            <div style={{ fontSize: 14 }}>
              <p 
                style={{ color: 'grey' }}
                className='marker'
              >
                {`${place.city}, ${place.state}`}
              </p>
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
        {props.show && 
          <InfoWindow 
            place={props.place}
            setMarker={props.setMarker}
          />}
      </>
    );
};

export default Marker