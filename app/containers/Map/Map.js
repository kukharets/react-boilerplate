import React, { Component } from 'react';
import { Circle, GoogleMap, withGoogleMap } from 'react-google-maps';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import canUseDOM from 'can-use-dom';
import raf from 'raf';

const geolocation =
  canUseDOM && navigator.geolocation
    ? navigator.geolocation
    : {
      getCurrentPosition(success, failure) {
        failure("Your browser doesn't support geolocation.");
      },
    };

const GeolocationExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap defaultZoom={13} center={props.center}>
    {props.center && (
      <Circle
        center={props.center}
        radius={props.radius}
        options={{
          fillColor: 'red',
          fillOpacity: 0.2,
          strokeColor: 'red',
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    )}
    {props.center && (
      <MarkerWithLabel
        clickable={false}
        zIndex={0}
        position={props.center}
        labelAnchor={new google.maps.Point(0, 0)}
        labelStyle={{
          backgroundColor: 'white',
          fontSize: '14px',
          minWidth: '300px',
          padding: '16px',
          visibility: 'hidden',
          zIndex: '1',
        }}
      >
        <div>
          <b>Title:</b>
        </div>
      </MarkerWithLabel>
    )}
  </GoogleMap>
));

export default class MapWithGeolocation extends Component {
  state = {
    center: null,
    content: null,
    radius: 500,
  };

  isUnmounted = false;

  componentDidMount() {
    const { onGeoLocationChange } = this.props;
    geolocation.getCurrentPosition(
      position => {
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          content: 'You are here.',
        });
        onGeoLocationChange({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        raf(tick);
      },
      reason => {
        if (this.isUnmounted) {
          return;
        }
        this.setState({
          center: {
            lat: 60,
            lng: 105,
          },
          content: `Error: The Geolocation service failed (${reason}).`,
        });
      },
    );
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    return (
      <GeolocationExampleGoogleMap
        containerElement={
          <div
            style={{ height: '60vh' }}
            className="embed-responsive embed-responsive-21by9"
          />
        }
        mapElement={<div className="embed-responsive-item" />}
        center={this.state.center}
        content={this.state.content}
        radius={this.state.radius}
      />
    );
  }
}
