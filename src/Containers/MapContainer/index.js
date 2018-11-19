import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "50%",
  height: "50%",
  margin: "0 auto"
};

export class MapContainer extends Component {
  renderMarkerComponent = () => {
    let { results } = this.props;
    return results.map((el, i) => {
      let { lat, lng } = el.cordinates;
      let { id, name, address } = el;
      return (
        <Marker
          key={i}
          id={id}
          title={`You are hovering over ${name}. It is located at ${address}. Click to view more detials.`}
          position={{ lat: lat, lng: lng }}
          onClick={obj => this.props.onMarkerClick(obj)}
        />
      );
    });
  };

  render() {
    let { google } = this.props;
    return (
      <Map
        google={google}
        zoom={4}
        initialCenter={{
          lat: 37.774929,
          lng: -122.419416
        }}
        style={mapStyles}
      >
        {this.renderMarkerComponent()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDVRt0j0Et1iFR9SbhXYQ5EDhybw4H-am0"
})(MapContainer);
