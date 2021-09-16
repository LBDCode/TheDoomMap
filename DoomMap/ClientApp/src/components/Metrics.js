import React, { Component, useState, useEffect } from 'react';
import API from '../utils/api';
import { Grid, withStyles, Box, Paper } from '@material-ui/core';

const styles = theme => ({
    paper: {
        fontSize: ".9rem"
    }

});



const Metrics = (props) => {

    const { classes } = props;

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
        <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
        >
             <Grid item xs={3}>
                <Paper className={classes.paper}>fires: {viewFires.length}</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.paper}>storms: {viewStorms.length}</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.paper}>fires: droughts: {viewDroughts.length}</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.paper}>areas: {viewAreas.length}</Paper>
            </Grid>            

        </ Grid>

    )
}

export default withStyles(styles)(Metrics);