import React, { Component } from 'react';
import { Circle, GoogleMap, InfoWindow, withGoogleMap } from 'react-google-maps';
import PropTypes from 'prop-types';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { StyleSheet, css } from 'aphrodite/no-important';
import Grade from '@material-ui/icons/Grade';
import Button from 'react-bootstrap/lib/Button';
import canUseDOM from 'can-use-dom';
import raf from 'raf';
import { markerBlue, markerGreen, markerRed, dropOnMap } from '../../../../public/vendors/gmap';

const style = StyleSheet.create({
    star: {
        height: '10px',
        marginRight: '-5px',
    },
    checkInButton: {
        height: '10px',
        color: 'red',
        marginLeft: '-15px',
        marginTop: '-20px',
        backgroundColor: 'white',
    },
});
const geolocation = (
    canUseDOM && navigator.geolocation ?
        navigator.geolocation :
        ({
            getCurrentPosition(success, failure) {
                failure('Your browser doesn\'t support geolocation.');
            },
        })
);

class Marker extends Component {
    static propTypes = {
        data: PropTypes.shape({
            title: PropTypes.string,
            address: PropTypes.string,
            coordinates: PropTypes.object.isRequired,
            status: PropTypes.oneOf(PropTypes.string, PropTypes.bool),
        }).isRequired,
    };
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }
    onMarkerClick(e) {
        if (this.props.onChoiseShop && e.target && e.target.nodeName === 'BUTTON') {
            e.preventDefault();
            e.stopPropagation();
            const { id } = this.props.data;
            this.props.onChoiseShop(this.props.data);
        } else {
            this.setState({
                selected: !this.state.selected,
            });
        }
    }
    handleChoiseShop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('handlechoiseshop in marker');

    }
    render() {
        const {
            id, address, title, coordinates, status = 0,
        } = this.props.data;
        const { onChoiseShop } = this.props;
        let markerIcon = markerRed;
        if (status === '5') {
            markerIcon = markerGreen;
        } else if (status === '4' || status === '3') {
            markerIcon = markerBlue;
        }
        const visibility = this.state.selected ? 'normal' : 'hidden';
        return (
            <MarkerWithLabel
                zIndex={1000}
                onClick={this.onMarkerClick}
                icon={markerIcon}
                position={coordinates.location}
                labelAnchor={new google.maps.Point(150, 0)}
                labelStyle={{
                    zIndex: '1001', backgroundColor: 'white', fontSize: '14px', minWidth: '300px', padding: '16px', visibility,
                }}
            >
                <div>
                    {onChoiseShop &&
                    <Button bsStyle="primary" bsSize="xsmall" onClick={this.handleChoiseShop}>
                        Choose
                    </Button>
                    }
                    {title}
                    {status > 0 && ' | ' && [...Array(parseInt(status))].map((key, index) => (<Grade
                        key={index}
                        className={`${css(style.star)}`}
                    />))}
                    <br />
                    <b>Address:</b> {address}
                </div>
            </MarkerWithLabel>
        );
    }
}

const GeolocationExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={13}
        center={props.center}
    >
        {props.mapLocationsList && props.mapLocationsList.length > 0 && props.mapLocationsList.map((location, index) => (
            <Marker key={index} data={location} onChoiseShop={props.onChoiseShop} />
        ))}
        {props.center && (
            <Circle
                center={props.center}
                radius={props.radius}
                options={{
                    fillColor: 'red',
                    fillOpacity: 0.20,
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
                icon={dropOnMap}
                position={props.center}
                labelAnchor={new google.maps.Point(0, 0)}
                labelStyle={{
                    backgroundColor: 'white', fontSize: '14px', minWidth: '300px', padding: '16px', visibility: 'hidden', zIndex: '1',
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
        geolocation.getCurrentPosition((position) => {
            this.setState({
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
                content: 'You are here.',
            });
            onGeoLocationChange({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
            raf(tick);
        }, (reason) => {
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
        });
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }
    render() {
        return (
            <GeolocationExampleGoogleMap
                mapLocationsList={this.props.mapLocationsList}
                onChoiseShop={this.props.onChoiseShop}
                containerElement={
                    <div style={{ height: '60vh' }} className="embed-responsive embed-responsive-21by9" />
                }
                mapElement={<div className="embed-responsive-item" />}
                center={this.state.center}
                content={this.state.content}
                radius={this.state.radius}
            />
        );
    }
}
