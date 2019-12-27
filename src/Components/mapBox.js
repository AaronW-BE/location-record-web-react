import React from 'react';
import '../App.css';
import {Map} from "react-amap";

const MAP_KEY = "069e239f00d6ab38ba51c8e4302dc4eb";

class MapBox extends React.Component{

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            path: nextProps.path
        })
    }

    constructor(props) {
        super(props);
        const defaultProps = {
            mapCenter: {
                longitude: 120.150446,
                latitude: 30.280413
            },
            zoom: 18,
            path: [],
        };
        let states = {};
        Object.assign(states, props, defaultProps);
        this.state = {
            plugins: [
                'OverView',
                'ControlBar',
            ],
            ...states,
        };

        this.amapEvents = {
            created(mapInstance) {
                console.log(mapInstance);
            }
        }
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
                    <MovementPath path={this.state.path} />
                </Map>
            </div>
        </div>
    }
}

class MovementPath extends React.Component{
    constructor(props) {
        super(props);
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
            path: this.props.path
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
            speed: 10000,
        })
        nav.start();
    }

    render() {
        return null;
    }
}
export default MapBox;
