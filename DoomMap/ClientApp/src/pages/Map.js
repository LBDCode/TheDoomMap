import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, CircleMarker, LayersControl, Popup, Tooltip, Polygon, Polyline, FeatureGroup, LayerGroup, GeoJSON } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { fireIcon } from './fire.png';



let DefaultIcon = L.icon({
    iconUrl: require('./fire.png'),
    iconRetinaUrl: require('./fire.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'dummy'
});




export default class MapComponent extends Component {

    state = {
        lat: 37.7749,
        lng: -122.4194,
        zoom: 13,
    }


    returnStormTrackCoordinates = (geoJSONcoords) => {

        let mappedCoords = geoJSONcoords.map(coord => {
            const newCoord = [coord[1], coord[0]]
            return newCoord
        });

        return mappedCoords;
    }


    render() {


        const yellowOptions = { fillColor: 'yellow', stroke: false }
        const orangeOptions = { fillColor: 'orange', stroke: false }
        const redOptions = { fillColor: 'red', stroke: false }
        const greenOptions = { fillColor: 'green', stroke: false }
        const blueOptions = { fillColor: 'blue', stroke: false }
        const purpleOptions = { fillColor: 'purple', stroke: false }
        const blackOptions = { color: 'black' }



        return (
            this.props.gages ?
                <MapContainer
                    center={[40.4958869189588, -99.2314387964737]}
                    zoom={4}
                    style={{ height: '100vh' }}>
                    <TileLayer
                        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <LayersControl position="topright">
                        <LayersControl.Overlay checked name="Active Fires">
                            <FeatureGroup>
                                {
                                    this.props.fires.map(fire => {

                                        if (fire && fire['geom'] && fire['dailyacres'] > 500) {
                                            const point = [fire['geom']['coordinates'][1], fire['geom']['coordinates'][0]]
                                            return (
                                                /*<CircleMarker center={point} key={fire['objectid']} color={'red'}>
                                                    <Popup>
                                                        <span>FIRE: {fire['incidentname']} - {fire['dailyacres']} acres</span>
                                                        <br />
                                                        <span>Reported date: {fire['firediscoverydatetime']}</span>
                                                        <br />
                                                        <span>Description: {fire['incidentshortdescription']}</span>
                                                        <br />
                                                    </Popup>
                                                </CircleMarker>*/

                                                <Marker icon={DefaultIcon} key={fire['objectid']} position={point}>
                                                    <Popup>
                                                        <span>FIRE: {fire['incidentname']} - {fire['dailyacres']} acres</span>
                                                        <br />
                                                        <span>Reported date: {fire['firediscoverydatetime']}</span>
                                                        <br />
                                                        <span>Description: {fire['incidentshortdescription']}</span>
                                                        <br />
                                                    </Popup>
                                                </Marker>
                                            )
                                        }
                                    })
                                }

                            </FeatureGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Fire Warnings/Red Flag Areas">
                            <FeatureGroup>
                                {
                                    this.props.redFlag.map(area => {
                               
                                        if (area && area['geom']) {

                                            return (
                                                < GeoJSON pathOptions={redOptions} key={area['gid']} data={area['geom']} />

                                            )
                                        }

                                    })
                                }
                            </FeatureGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Heat Advisories">

                            <FeatureGroup>
                                {
                                    this.props.heatAdvisory.map(area => {

                                        if (area && area['geom']) {

                                            return (
                                                < GeoJSON pathOptions={greenOptions} key={area['gid']} data={area['geom']} />

                                            )
                                        }

                                    })
                                }
                            </FeatureGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Flood Watch Areas">

                            <FeatureGroup>
                                {
                                    this.props.floodWatch.map(area => {

                                        if (area && area['geom']) {

                                            return (
                                                < GeoJSON pathOptions={blueOptions} key={area['gid']} data={area['geom']} />

                                            )
                                        }

                                    })
                                }
                            </FeatureGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Drought Conditions">

                            <FeatureGroup>
                                {
                                    this.props.droughtConditions.map(area => {

                                        function returnColor(dmScore) {

                                            let color;

                                            if (dmScore === 3) {
                                                color = yellowOptions;
                                            } else if (dmScore === 4) {
                                                color = orangeOptions;
                                            } else if (dmScore === 5) {
                                                color = redOptions;
                                            }
                                            return color;
                                        }


                                        if (area && area['geom'] && area.dm && area.dm > 2) {

                                            return (
                                                < GeoJSON pathOptions={returnColor(area.dm)} key={area['gid']} data={area['geom']} />

                                            )
                                        }

                                    })
                                }
                            </FeatureGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Storm Surge">

                            <FeatureGroup>
                                {
                                    this.props.stormConditions.map(area => {

                                        function returnColor(max_ft) {

                                            let color;

                                            if (max_ft < 2) {
                                                color = blueOptions;
                                            } else if (max_ft >= 2 && max_ft < 4) {
                                                color = greenOptions;
                                            } else if (max_ft >= 4 && max_ft < 6) {
                                                color = yellowOptions;
                                            } else if (max_ft >= 6 && max_ft < 8) {
                                                color = orangeOptions;
                                            } else if (max_ft >= 8 && max_ft < 9.5) {
                                                color = redOptions;
                                            } else if (max_ft >= 9.5) {
                                                color = purpleOptions;
                                            }

                                            return color;
                                        }


                                        if (area && area['geom'] && area.max_ft) {

                                            return (
                                                < GeoJSON pathOptions={returnColor(area.max_ft)} key={area['gid']} data={area['geom']} />

                                            )
                                        }

                                    })
                                }
                            </FeatureGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Storm Track">

                            <FeatureGroup>
                                {
                                    this.props.stormTrackLine.map(track => {

                                        if (track && track['geom']) {
                                            let coords = this.returnStormTrackCoordinates(track['geom']['coordinates'][0])
                                            return (
                                                <Polyline
                                                    positions={coords}
                                                    color={'black'}
                                                />
                                            )
                                        }

                                    })
                 
                                }
                            </FeatureGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Storm Area">

                            <FeatureGroup>
                                {
                                    this.props.stormTrackPgn.map(area => {

                                        if (area && area['geom']) {

                                            return (
                                                < GeoJSON pathOptions={blackOptions} key={area['gid']} data={area['geom']} />

                                            )
                                        }

                                    })
                                }
                            </FeatureGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Storm Timeline">

                            <FeatureGroup>
                                {
                                    this.props.stormTrackPts.map(point => {

                                        if (point && point['geom']) {
                                            const pointCoords = [point['geom']['coordinates'][1], point['geom']['coordinates'][0]]
                                            return (
                                                <CircleMarker center={pointCoords} key={point['gid']} color={'white'}>

                                                    <Tooltip direction="bottom" opacity={1} permanent>
                                                       {point['datelbl']}
                                                    </Tooltip>

                                                </CircleMarker>

                                            )
                                        }
                                    })
                                }
                            </FeatureGroup>
                        </LayersControl.Overlay>
                    </LayersControl>
                </MapContainer>

                :
                'Data is loading...'
        )
    }
}
