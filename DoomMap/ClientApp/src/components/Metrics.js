import React, { Component, useState, useEffect } from 'react';
import API from '../utils/api';

function Metrics(props) {

    const [viewFires, setViewFires] = useState([])
    const [viewDroughts, setViewDroughts] = useState([])
    const [viewAreas, setViewAreas] = useState([])
    const [viewStorms, setViewStorms] = useState([])

    const updateDisasterMetrics = (boundingCoords) => {

        const polyCoords = {
            xmin: boundingCoords['_southWest']['lng'],
            ymin: boundingCoords['_southWest']['lat'],
            xmax: boundingCoords['_northEast']['lng'],
            ymax: boundingCoords['_northEast']['lat']
        }

        API.getFiresInBounds(polyCoords).then(response => response.json())
            .then(data => {
                setViewFires(data)
            }).catch(err => console.log(err));

        API.getDroughtsInBounds(polyCoords).then(response => response.json())
            .then(data => {
                setViewDroughts(data)
            }).catch(err => console.log(err));

        API.getAreasInBounds(polyCoords).then(response => response.json())
            .then(data => {
                setViewAreas(data)
            }).catch(err => console.log(err));

        API.getStormsInBounds(polyCoords).then(response => response.json())
            .then(data => {
                setViewStorms(data)
            }).catch(err => console.log(err));

    }

    useEffect(() => {
        updateDisasterMetrics(props.viewBounds)

    }, [props.viewBounds])

    return (
        <p>
            fires: {viewFires.length}
            storms: {viewStorms.length}
            droughts: {viewDroughts.length}
            areas: {viewAreas.length}
        </p>
    )
}

export default Metrics;