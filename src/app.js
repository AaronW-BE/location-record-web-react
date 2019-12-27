import React from "react";
import "./App.css"
import 'antd/dist/antd.css';
import Router from './router';

export default class App extends React.Component{
    render() {
        return <div>
            <Router />
        </div>
    }
}