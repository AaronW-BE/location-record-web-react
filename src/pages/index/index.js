import React from 'react';
import MapBox from "../../Components/mapBox";
import {FetchLocation} from "../../api/location";

class Index extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            locations: []
        };
        this.checkLogin();

        this.getLocation();
    }

    // componentDidMount() {
    //     this.getLocation();
    // }

    render() {
        return (
            <MapBox path={this.state.locations}/>
        );
    }

    getLocation() {
        FetchLocation().then(r => {
            if (r.data.data) {
                this.setState({
                    locations: r.data.data.map(location => {
                        return [
                            parseFloat(location.Lng),
                            parseFloat(location.Lat)
                        ]
                    })
                })
            }
        })
    }

    checkLogin() {
        if (!window.sessionStorage.getItem("token")) {
            this.props.history.replace('/login');
        }
    }
}


export default Index;