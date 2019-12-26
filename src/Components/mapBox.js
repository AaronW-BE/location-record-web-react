import React from 'react';
import '../App.css';
import {Map} from "react-amap";

const MAP_KEY = "069e239f00d6ab38ba51c8e4302dc4eb";

class MapBox extends React.Component{
    constructor() {
        super();

        this.state = {
            mapCenter: {
                longitude: 120.150446,
                latitude: 30.280413
            },
            plugins: [
                'OverView',
                'ControlBar',
            ],
            zoom: 17,
        };

        this.amapEvents = {
            created(mapInstance) {
                console.log(mapInstance);
            }
        }
    }

    handleZoomIn() {
        this.setState({
            zoom: this.state.zoom + 1
        })
    }

    handleZoomOut() {
        this.setState({
            zoom: this.state.zoom - 1
        })
    }

    render() {
        return <div className="app">
            <div className="map">
                <Map amapkey={MAP_KEY}
                     zoom={this.state.zoom}
                     center={this.state.mapCenter}
                     plugins={this.state.plugins}
                     useAMapUI={true}
                     events={this.amapEvents}>
                    <MovementPath />
                </Map>
            </div>
            <button onClick={this.handleZoomIn.bind(this)}>zoom +</button>
            <button onClick={this.handleZoomOut.bind(this)}>zoom -</button>
        </div>
    }
}

class MovementPath extends React.Component{
    constructor() {
        super();
        this.loadUI();
    }

    loadUI() {
        window.AMapUI.loadUI(['misc/PathSimplifier'], (PathSimplifier) => {
            this.initPage(PathSimplifier);
        })
    }

    initPage(PathSimplifier) {
        if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }
        const map = this.props.__map__;

        let emptyLineStyle = {
            lineWidth: 0,
            fillStyle: null,
            strokeStyle: null,
            borderStyle: null
        }
        let pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            map: map,
            getPath: function (pathData, pathIndex) {
                return pathData.path;
            },
            getHoverTitle: function(pathData, pathIndex, pointIndex) {
                return null;
            },
            renderOptions: {
                pathLineStyle: emptyLineStyle,
                pathLineSelectedStyle: emptyLineStyle,
                pathLineHoverStyle: emptyLineStyle,
                keyPointStyle: emptyLineStyle,
                startPointStyle: emptyLineStyle,
                endPointStyle: emptyLineStyle,
                keyPointHoverStyle: emptyLineStyle,
                keyPointOnSelectedPathLineStyle: emptyLineStyle,
            }
        });

        pathSimplifierIns.setData([{
            name: 'line',
            path: [
                [120.150446, 30.280413],
                [120.205289, 30.904987],
                [120.305289, 30.904987],
                [120.3, 30.1],
                [120.4, 30.23],
                [120.5, 30.3],
                [120.305289, 30.904987],

            ]
        }]);

        let nav = pathSimplifierIns.createPathNavigator(0, {
            loop: true,
            pathNavigatorStyle: {
                strokeStyle: 'red',
                fillStyle: 'red',
                pathLinePassedStyle: {
                    lineWidth: 3,
                    strokeStyle: 'green',
                },
            },
            speed: 100000,
        })
        nav.start();
    }

    render() {
        return null;
    }
}
export default MapBox;
