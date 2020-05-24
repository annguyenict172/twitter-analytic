import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapStyles from '../style/GoogleMapStyles'

export function MapContainer(props) {
  const {view} = useContext(GlobalContext);
  return (
    <Map 
      google={props.google} 
      styles={ GoogleMapStyles }
      initialCenter={{
        lat: -37.840935,
        lng: 144.946457
      }}
      center={view.location}
      zoom={10}
      zoomControl={false}
      gestureHandling={"none"}>
    </Map>
  );
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY
})(MapContainer)