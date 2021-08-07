import React, { createContext, Component } from "react";




export const MapContext = createContext();

class MapContextProvider extends Component {

    state = {
        fires: [],
        stormDamageData: null,
        stormDamageList: [],
    }


    getFireData = () =>
    {
        API.getFires().then(response => response.json())
            .then(data => {
                this.setState({ fires: data })

            })
            .catch(err => console.log(err));

    }

    calcFireMetrics = (fireData) => {

    }


    render() {

        return (
            <MapContext.Provider value={{
                fires: this.state.fires,
                getFireData: this.getFireData,
                getStormList: this.getStormListAnd
            }}>
                {this.props.children}
            </MapContext.Provider>
        );
    }
}

export default MapContextProvider;