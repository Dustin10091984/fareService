import React, { useState, useEffect } from 'react';
import { GoogleMap as Map, DirectionsRenderer } from "@react-google-maps/api";
import moment from 'moment';
export const GoogleMap = (props) => {
  
    const [state, setstate] = useState(props.location.state);

    const directionsService = new window.google.maps.DirectionsService();

    useEffect(() => {
      directionsService.route({
            origin: state?.from_address,
            destination: state?.to_address,
            travelMode: 'DRIVING',
        }, (result, status) => {
            if (status === 'OK') {
                setstate({
                    ...state,
                    response: result,
                });
            }
        });
    }, [props.open]);
    
    useEffect(() => {
        directionsService.route({
            origin: state?.origin,
            destination: state?.destination,
            travelMode: 'DRIVING',
        }, (result, status) => {
            if (status === 'OK') {
                setstate({
                    ...state,
                    response: result,
                });
            }
        });
    }, [state.origin, state.destination]);

    

    return (
      <>
          <Map
            // required
            id='direction-example'
            // required
            mapContainerStyle={{
              height: '400px',
              width: '100%'
            }}
            center={{
              lat: 0,
              lng: -180
            }}
            // required
            zoom={7}
           
          >

            {
              state?.response !== null && (
                <DirectionsRenderer
                  // required
                  options={{ 
                    directions: state?.response
                  }}
                />
              )
            }
        </Map>
        <div className="row mt-5 mb-5 m-1 pb-5"
          style={{
            border: '0.5rem solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 0.5rem 1rem rgba(0,0,0,.15)',
          }}
        >
          <div className="col-12">
            <div className="title-move text-center">
                Moving Details
            </div>
            <div className='col-md-12 text-dark' style={{fontSize: '2rem'}}>Moving From</div>
            <div className="common-input pr-1">
                <input
                    type="text"
                    placeholder="date e.g 2222-12-30"
                    value={state.from_address}
                    disabled
                />
            </div>
            <div className='col-md-12 text-dark' style={{fontSize: '2rem'}}>Moving To</div>
            <div className="common-input pr-1">
                <input
                    type="text"
                    placeholder="date e.g 2222-12-30"
                    value={state.to_address}
                    disabled
                />
            </div>
            <div className='col-md-12 text-dark' style={{fontSize: '2rem'}}>Moving Date</div>
            <div className="common-input pr-1">
                <input
                    type="text"
                    placeholder="date e.g 2222-12-30"
                    value={state.date ? moment(state.date).format('YYYY-MM-DD') : ''}
                    disabled
                />
            </div>
            <div className='col-md-12 text-dark' style={{fontSize: '2rem'}}>Zip Code</div>
            <div className="common-input pr-1">
                <input
                    type="text"
                    name="zip_code"
                    placeholder="Zip Code e.g 00000"
                    value={state.zip_code}
                    disabled
                />
            </div>
          </div>
        </div>
    </>
  );
}
