import React, { Component } from 'react';
import { Route } from 'react-router';
import axios from 'axios';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Map from './pages/Map'
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import API from './utils/api.js';
import WORKERFUNCTION from './utils/workerFunctions';
import './custom.css'

export default class App extends Component {

    static displayName = App.name;

    state = {
        incidents: [],
        gages: [],
        fires: [],
        advisoryAreas: [],
        redFlag: [],
        heatAdvisory: [],
        floodWatch: [],
        droughtConditions: [],
        stormConditions: [],
        stormTrackLine: [],
        stormTrackPgn: [],
        stormTrackPts: [],
        viewFires: [],
        viewAreas: [],
        viewDroughts: [],
        viewStorms: [],
    }

    componentDidMount() {

        API.getFires().then(response => response.json())
            .then(data => {
                this.setState({ fires: data })
                WORKERFUNCTION.calcFireMetrics(data);
            })
            .catch(err => console.log(err));

        API.getAdvisoryAreas("redflag").then(response => response.json())
            .then(data => {
                console.log("red flag", data)
                this.setState({ redFlag: data })
                WORKERFUNCTION.calcRedFlagMetrics(data)
            })
            .catch(err => console.log(err));

        API.getAdvisoryAreas("heatadvisory").then(response => response.json())
            .then(data => {
                this.setState({ heatAdvisory: data })

            })
            .catch(err => console.log(err));

        API.getAdvisoryAreas("floodwatch").then(response => response.json())
            .then(data => {
                this.setState({ floodWatch: data })
                WORKERFUNCTION.calcFloodMetrics(data)
            })
            .catch(err => console.log(err));

        API.getDroughtConditions().then(response => response.json())
            .then(data => {
                console.log("drought", data)

                this.setState({ droughtConditions: data })
            })
            .catch(err => console.log(err));

        API.getStormTrack("line").then(response => response.json())
            .then(data => {
                this.setState({ stormTrackLine: data })

            })
            .catch(err => console.log(err));

        API.getStormTrack("pgn").then(response => response.json())
            .then(data => {
                this.setState({ stormTrackPgn: data })

            })
            .catch(err => console.log(err));

        API.getStormTrack("pts").then(response => response.json())
            .then(data => {
                this.setState({ stormTrackPts: data })

            })
            .catch(err => console.log(err));

    };



    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/map'>
                    <Map
                        gages={this.state.gages}
                        fires={this.state.fires}
                        droughtConditions={this.state.droughtConditions}
                        stormConditions={this.state.stormConditions}
                        heatAdvisory={this.state.heatAdvisory}
                        floodWatch={this.state.floodWatch}
                        redFlag={this.state.redFlag}
                        stormTrackLine={this.state.stormTrackLine}
                        stormTrackPgn={this.state.stormTrackPgn}
                        stormTrackPts={this.state.stormTrackPts}
                    />
                </Route>
            </Layout>
        );
    }
}
