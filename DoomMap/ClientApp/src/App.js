import React, { Component } from 'react';
import { Route } from 'react-router';
import axios from 'axios';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Map from './pages/Map'
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;
    state = {
        incidents: [],
    }

    async componentDidMount() {
        const res = await axios.get('https://data.sfgov.org/resource/wr8u-xric.json', {
            params: {
                "$limit": 500,
                "$$app_token": "mMBPu3Z5Dnnd4Kb8dMFcp97V0"
            }
        })
        const incidents = res.data;
        this.setState({ incidents: incidents });
    };

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/map'>
                    <Map incidents={this.state.incidents} />
                </Route>
            </Layout>
        );
    }
}
