import React, { Component, useState, useMemo, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, CircleMarker, LayersControl, Popup, Tooltip, Polygon, Polyline, FeatureGroup, LayerGroup, GeoJSON } from 'react-leaflet';
import { Grid, withStyles, Box } from '@material-ui/core';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { fireIcon } from './fire.png';
import MapLayers from '../components/MapLayers';


let DefaultIcon = L.icon({
    iconUrl: require('./fire.png'),
    iconRetinaUrl: require('./fire.png'),
    iconAnchor: new L.Point(0, 0),
    popupAnchor: new L.Point(16, 0),
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'dummy'
});



const MapComponent = (props) => {

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
    const blackOptions = { color: 'black' }

    const displayMap = 

            <MapContainer
                center={[40.4958869189588, -99.2314387964737]}
                zoom={4}
                whenCreated={setMap}
                style={{ height: '100vh' }}>
                <TileLayer
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapLayers
                    gages={props.gages}
                    fires={props.fires}
                    droughtConditions={props.droughtConditions}
                    stormConditions={props.stormConditions}
                    heatAdvisory={props.heatAdvisory}
                    floodWatch={props.floodWatch}
                    redFlag={props.redFlag}
                    stormTrackLine={props.stormTrackLine}
                    stormTrackPgn={props.stormTrackPgn}
                    stormTrackPts={props.stormTrackPts}
                    updateDisasterMetrics={props.updateDisasterMetrics}
                />
            </MapContainer>




    function DisplayPosition({ map, updateDisasterMetrics }) {
        const [position, setPosition] = useState(map.getCenter())


        const onMove = useCallback(() => {
            setPosition(map.getCenter())
            updateDisasterMetrics(map.getBounds())
        }, [map])

        useEffect(() => {
            map.on('move', onMove)
            return () => {
                map.off('move', onMove)
            }
        }, [map, onMove])

        return (
            <p>
                latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
            </p>
        )
    }


    return (
        <div>
            {map ? <DisplayPosition map={map} updateDisasterMetrics={props.updateDisasterMetrics} /> : null}

            <MapContainer
                center={[40.4958869189588, -99.2314387964737]}
                zoom={4}
                whenCreated={setMap}
                style={{ height: '100vh' }}>
                <TileLayer
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapLayers
                    gages={props.gages}
                    fires={props.fires}
                    droughtConditions={props.droughtConditions}
                    stormConditions={props.stormConditions}
                    heatAdvisory={props.heatAdvisory}
                    floodWatch={props.floodWatch}
                    redFlag={props.redFlag}
                    stormTrackLine={props.stormTrackLine}
                    stormTrackPgn={props.stormTrackPgn}
                    stormTrackPts={props.stormTrackPts}
                />
            </MapContainer>
        </div>
    )
}


export default MapComponent