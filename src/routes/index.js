import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from 'components/app';
import Online from "./online"

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <App>
                    {this.props.children}
                    <Route path="/online/" component={Online} />
                </App>
            </Router>
        );
    }
}
