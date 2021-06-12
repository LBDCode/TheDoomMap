import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});


export default class MapComponent extends Component {

    state = {
        lat: 37.7749,
        lng: -122.4194,
        zoom: 13,
    }

    render() {
        return (
            this.props.incidents ?
                <MapContainer
                    center={[this.state.lat, this.state.lng]}
                    zoom={this.state.zoom}
                    style={{ height: '100vh' }}>
                    <TileLayer
                        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        this.props.incidents.map(incident => {
                            const point = [incident['point']['coordinates'][1], incident['point']['coordinates'][0]]


                            return (
                                <Marker position={point} key={incident['incident_number']} icon={DefaultIcon}>
                                    <Popup>
                                        <span>ADDRESS: {incident['address']}, {incident['city']} - {incident['zip_code']}</span>
                                        <br />
                                        <span>BATTALION: {incident['battalion']}</span><br />
                                    </Popup>
                                </Marker>
                            )
                        })
                    }
                </MapContainer>

                :
                'Data is loading...'
        )
    }
}
