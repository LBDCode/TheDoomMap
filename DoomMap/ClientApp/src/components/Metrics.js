import React, { Component, useState, useEffect } from 'react';
import API from '../utils/api';
import { Grid, withStyles, Box, Paper } from '@material-ui/core';

const styles = theme => ({
    paper: {
        fontSize: ".9rem"
    },
    metricsGrid: {
        position: "fixed",
        zIndex: "5000",
        bottom: "10px",
        padding: "4px"
    },
    metricsItem: {
        opacity: ".8",
        textAlign: "center"
    },
    metricsPaper: {
        backgroundColor: "red",
        fontSize: ".9rem",
        textAlign: "center"
    },


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

        //API.getFiresInBounds(polyCoords).then(response => response.json())
        //    .then(data => {
        //        setViewFires(data)
        //    }).catch(err => console.log(err));

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
            spacing={2}
            className={classes.metricsGrid}
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
        >
            <Grid className={classes.metricsItem} item xs={3}>
                <Paper className={classes.metricsPaper}>
                    <h3>{viewFires.length} fires in view</h3>
                    <h4>acres burned</h4>
                </Paper>
            </Grid>
            <Grid className={classes.metricsItem} item xs={3}>
                <Paper className={classes.metricsPaper}>                    
                    <h3>{viewStorms.length} storms in view</h3>
                    <h4>acres burned</h4>
                </Paper>
            </Grid>
            <Grid className={classes.metricsItem} item xs={3}>
                <Paper className={classes.metricsPaper}>                    
                    <h3>{viewDroughts.length} droughts in view</h3>
                    <h4>acres affected</h4>
                </Paper>
            </Grid>
            <Grid className={classes.metricsItem} item xs={3}>
                <Paper className={classes.metricsPaper}>                    
                    <h3>{viewAreas.length} advisory areas in view</h3>
                    <h4>acres affected</h4>
                </Paper>
            </Grid>            

        </ Grid>

    )
}

export default withStyles(styles)(Metrics);