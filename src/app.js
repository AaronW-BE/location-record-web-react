import React from "react";
import "./App.css"
import 'antd/dist/antd.css';
import Login from "./pages/login/login";

export default class App extends React.Component{
    render() {
        return <div>
            <Login />
        </div>
    }
}