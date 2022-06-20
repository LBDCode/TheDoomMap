import React, { Component, useState } from 'react';
import { MapContainer, TileLayer, Marker, CircleMarker, LayersControl, Popup, Tooltip, Polygon, Polyline, FeatureGroup, LayerGroup, GeoJSON } from 'react-leaflet';
import { Grid, withStyles, Box } from '@material-ui/core';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';


let DefaultIcon = L.icon({
    iconUrl: require('../pages/fire.png'),
    iconRetinaUrl: require('../pages/fire.png'),
    iconAnchor: new L.Point(0, 0),
    popupAnchor: new L.Point(16, 0),
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'firePoint'
});



const MapLayersComponent = (props) => {

    //const [position, setPosition] = useState(map.getCenter())
    const [map, setMap] = useState(null)

    const [centerLatLong, setCenterLatLong] = useState([37.7749, -122.4194])



    const returnStormTrackCoordinates = (geoJSONcoords) => {

        let mappedCoords = geoJSONcoords.map(coord => {
            const newCoord = [coord[1], coord[0]]
            return newCoord
        });

        return mappedCoords;
    }


    const yellowOptions = { fillColor: 'yellow', stroke: false }
    const orangeOptions = { fillColor: 'orange', stroke: false }
    const redOptions = { fillColor: 'red', stroke: false }
    const greenOptions = { fillColor: 'green', stroke: false }
    const blueOptions = { fillColor: 'blue', stroke: false }
    const purpleOptions = { fillColor: 'purple', stroke: false }
    const blackOptions = { color: 'black', weight: '2' }



    return (
        props.gages ?

            <LayersControl position="topright">
                <LayersControl.Overlay checked name="Active Fires">
                    <FeatureGroup>
                        {
                            props.fires.map(fire => {

                                if (fire && fire['geom'] && fire['dailyacres'] > 500) {

                                    const point = [fire['geom']['coordinates'][1], fire['geom']['coordinates'][0]]

                                    return (
                                        <Marker icon={DefaultIcon} key={fire['objectid']} position={point}>
                                            <Tooltip sticky>
                                                <span>Fire: {fire['incidentname'] ? fire['incidentname'] : 'N/A'}</span>
                                                <br />
                                                <span>Daily acres burned: {fire['dailyacres'] ? fire['dailyacres'] : 'N/A'} acres</span>
                                                <br />
                                                <span>Reported date: {fire['firediscoverydatetime'] ? fire['firediscoverydatetime'] : 'N/A'}</span>
                                                <br />
                                                <span>Description: {fire['incidentshortdescription'] ? fire['incidentshortdescription'] : 'N/A'}</span>
                                                <br />
                                            </Tooltip>
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
                            props.redFlag.map(area => {

                                if (area && area['geom']) {
                                    return (
                                        < GeoJSON pathOptions={redOptions} key={area['gid']} data={area['geom']}>
                                            <Tooltip sticky>
                                                <span>{area['prod_type']}</span>
                                                <br />
                                                <span>In Effect: {area['onset']} - {area['ends']}</span>
                                                <br />
                                            </Tooltip>
                                        </GeoJSON>
                                    )
                                }

                            })
                        }
                    </FeatureGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Heat Advisories">

                    <FeatureGroup>
                        {
                            props.heatAdvisory.map(area => {

                                if (area && area['geom']) {
                                    return (
                                        < GeoJSON pathOptions={greenOptions} key={area['gid']} data={area['geom']}>
                                            <Tooltip sticky>
                                                <span>{area['prod_type']}</span>
                                                <br />
                                                <span>In Effect: {area['onset']} - {area['ends']}</span>
                                                <br />
                                            </Tooltip>
                                        </GeoJSON>
                                    )
                                }

                            })
                        }
                    </FeatureGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Flood Watch Areas">

                    <FeatureGroup>
                        {
                            props.floodWatch.map(area => {

                                if (area && area['geom']) {
                                    return (
                                        < GeoJSON pathOptions={blueOptions} key={area['gid']} data={area['geom']}>
                                            <Tooltip sticky>
                                                <span>{area['prod_type']}</span>
                                                <br />
                                                <span>In Effect: {area['onset']} - {area['ends']}</span>
                                                <br />
                                            </Tooltip>
                                        </GeoJSON>
                                    )
                                }

                            })
                        }
                    </FeatureGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Drought Conditions">

                    <FeatureGroup>
                        {
                            props.droughtConditions.map(area => {

                                function returnColor(dmScore) {

                                    let color;

                                    if (dmScore === 2) {
                                        color = yellowOptions;
                                    } else if (dmScore === 3) {
                                        color = orangeOptions;
                                    } else if (dmScore === 4) {
                                        color = redOptions;
                                    }
                                    return color;
                                }

                                const dmData = {
                                    2: "Severe Drought",
                                    3: "Extreme Drought",
                                    4: "Exceptional Drought"
                                }


                                if (area && area['geom'] && area.dm && area.dm >= 2) {
                                    return (
                                        <GeoJSON pathOptions={returnColor(area.dm)} key={area['gid']} data={area['geom']}>
                                            <Tooltip sticky>
                                                <span>Drought Warning</span>
                                                <br />
                                                <span>Severity: D{area['dm']} ({dmData[area['dm']]})</span>
                                                <br />
                                            </Tooltip>
                                        </GeoJSON>
                                    )
                                }

                            })
                        }
                    </FeatureGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Storm Surge">

                    <FeatureGroup>
                        {
                            props.stormConditions.map(area => {

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
                            props.stormTrackLine.map(track => {
                                if (track && track['geom']) {
                                    let coords = returnStormTrackCoordinates(track['geom']['coordinates'][0])
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
                            props.stormTrackPgn.map(area => {
                                const stormTypes = {
                                    "HU": "Hurricane",
                                    "TD": "Tropical Depression",
                                    "TS": "Tropical Storm"
                                };

                                if (area && area['geom']) {
                                    return (
                                        < GeoJSON pathOptions={blackOptions} key={area['gid']} data={area['geom']}>
                                            <Tooltip direction="bottom" opacity={1} permanent>
                                                <span>{stormTypes[area['stormtype']]} {area['stormname']}</span>
                                                <br />
                                                <span>Advisory: {area['advisnum']}</span>
                                                <br />
                                            </Tooltip>
                                        </ GeoJSON>
                                    )
                                }
                            })
                        }
                    </FeatureGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Storm Timeline">

                    <FeatureGroup>
                        {
                            props.stormTrackPts.map(point => {

                                if (point && point['geom']) {
                                    const pointCoords = [point['geom']['coordinates'][1], point['geom']['coordinates'][0]]
                                    return (
                                        <CircleMarker center={pointCoords} key={point['gid']} color={'white'}>
                                            <Tooltip direction="bottom" opacity={1} >
                                                <span>{point['stormname']} - {point['tcdvlp']}</span>
                                                <br />
                                                <span>wind gusts up to {point['gust']} MPH</span>
                                                <br />
                                                <span>{point['datelbl']}</span>
                                            </Tooltip>
                                        </CircleMarker>
                                    )
                                }
                            })
                        }
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl>
            :
            'Data is loading...'
    )
}


export default MapLayersComponent