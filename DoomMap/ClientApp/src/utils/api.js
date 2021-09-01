

export default {
    getGages: function() {
        return fetch(`api/gages`);
    },
    getFires: function () {
        return fetch(`api/fires`);
    },
    getAdvisoryAreas: function (type) {
        return fetch(`api/advisoryareas/${type}`);
    },
    getDroughtConditions: function() {
        return fetch(`api/drought`);
    },
    getStormConditions: function () {
        return fetch(`api/storm`);
    },
    getStormTrack: function (component) {
        return fetch(`api/stormtrack/${component}`);
    },
    getDisastersInBounds: function (boundingCoords) {
        console.log(boundingCoords)
    }
};