import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, FeatureGroup, LayerGroup, GeoJSON } from 'react-leaflet';
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

                    <FeatureGroup>
                        {
                            this.props.fires.map(fire => {

                                if (fire && fire['geom'] && fire['dailyacres'] > 100) {
                                    const point = [fire['geom']['coordinates'][1], fire['geom']['coordinates'][0]]

                                    return (
                                        <Marker position={point} key={fire['gid']} icon={DefaultIcon}>
                                            <Popup>
                                                <span>FIRE: {fire['incidentna']} - {fire['dailyacres']} acres</span>
                                                <br />
                                                <span>Reported date: {fire['firediscov']}</span>
                                                <br />
                                                <span>center: {point}</span>
                                            </Popup>
                                        </Marker>
                                    )
                                }

                            })

                        }

                    </FeatureGroup>
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

                    <FeatureGroup>
                        {
                            this.props.heatAdvisory.map(area => {

                                if (area && area['geom']) {

                                    return (
                                        < GeoJSON pathOptions={orangeOptions} key={area['gid']} data={area['geom']} />

                                    )
                                }

                            })
                        }
                    </FeatureGroup>

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

                    <FeatureGroup>
                        {
                            this.props.stormTrackLine.map(track => {

                                if (track && track['geom']) {

                                    return (
                                        < GeoJSON pathOptions={redOptions} key={track['gid']} data={track['geom']} />

                                    )
                                }

                            })
                        }
                    </FeatureGroup>
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
                    <FeatureGroup>
                        {
                            this.props.stormTrackPts.map(area => {

                                if (area && area['geom']) {

                                    return (
                                        < GeoJSON pathOptions={blueOptions} key={area['gid']} data={area['geom']} />

                                    )
                                }

                            })
                        }
                    </FeatureGroup>

                    {/*<FeatureGroup>
                        {
                              this.props.gages.map(gage => {

                            if (gage && gage['location_geom']) {
                                const point = [gage['location_geom']['coordinates'][1], gage['location_geom']['coordinates'][0]]

                                return (
                                    <Marker position={point} key={gage['site_no']} icon={DefaultIcon}>
                                        <Popup>
                                            <span>GAGE: {gage['site_no']} - {gage['station_nm']}</span>
                                        </Popup>
                                    </Marker>
                                )
                            }

                        })
                        }

                    </FeatureGroup>*/}

                </MapContainer>

                :
                'Data is loading...'
        )
    }
}
