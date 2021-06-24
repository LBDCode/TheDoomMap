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


        const purpleOptions = { color: 'purple' }
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
                                const red = { color: 'red' }
                               
                                if (area && area['geom']) {

                                    return (
                                        < GeoJSON pathOptions={red} key={area['gid']} data={area['geom']} />

                                    )
                                }

                            })
                        }
                    </FeatureGroup>

                    <FeatureGroup>
                        {
                            this.props.heatAdvisory.map(area => {
                                const orange = { color: 'orange' }


                                if (area && area['geom']) {

                                    return (
                                        < GeoJSON pathOptions={orange} key={area['gid']} data={area['geom']} />

                                    )
                                }

                            })
                        }
                    </FeatureGroup>

                    <FeatureGroup>
                        {
                            this.props.floodWatch.map(area => {
                                const blue = { color: 'blue' }


                                if (area && area['geom']) {

                                    return (
                                        < GeoJSON pathOptions={blue} key={area['gid']} data={area['geom']} />

                                    )
                                }

                            })
                        }
                    </FeatureGroup>

                    <FeatureGroup>
                        {
                            this.props.droughtConditions.map(area => {
                                const yellow = {color: 'yellow'}
                                const orange = { color: 'orange' }
                                const red = { color: 'red' }

                                function returnColor(dmScore) {

                                    let color;

                                    if (dmScore === 3) {
                                        color = yellow;
                                    } else if (dmScore === 4) {
                                        color = orange;
                                    } else if (dmScore === 5) {
                                        color = red;
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
                                const yellow = { color: 'yellow' }
                                const orange = { color: 'orange' }
                                const red = { color: 'red' }
                                const green = { color: 'green' }
                                const blue = { color: 'blue' }
                                const purple = {clor: 'purple'}

                                function returnColor(max_ft) {

                                    let color;

                                    if (max_ft < 2) {
                                        color = blue;
                                    } else if (max_ft >= 2 && max_ft < 4) {
                                        color = green;
                                    } else if (max_ft >= 4 && max_ft < 6) {
                                        color = yellow;
                                    } else if (max_ft >= 6 && max_ft < 8) {
                                        color = orange;
                                    } else if (max_ft >= 8 && max_ft < 9.5) {
                                        color = red;
                                    } else if (max_ft >= 9.5) {
                                        color = purple;
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
                                const red = { color: 'red' }


                                if (track && track['geom']) {

                                    return (
                                        < GeoJSON pathOptions={red} key={track['gid']} data={track['geom']} />

                                    )
                                }

                            })
                        }
                    </FeatureGroup>
                    <FeatureGroup>
                        {
                            this.props.stormTrackPgn.map(area => {
                                const black = { color: 'black' }


                                if (area && area['geom']) {

                                    return (
                                        < GeoJSON pathOptions={black} key={area['gid']} data={area['geom']} />

                                    )
                                }

                            })
                        }
                    </FeatureGroup>
                    <FeatureGroup>
                        {
                            this.props.stormTrackPts.map(area => {
                                const blue = { color: 'blue' }


                                if (area && area['geom']) {

                                    return (
                                        < GeoJSON pathOptions={blue} key={area['gid']} data={area['geom']} />

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
