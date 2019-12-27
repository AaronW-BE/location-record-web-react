import React from "react";

class NotFound extends React.Component{
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <h1>
                NOT FOUND
            </h1>
        )
    }
}

export default NotFound;