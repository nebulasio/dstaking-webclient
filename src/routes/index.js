import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from 'components/app';
import Online from "./online"

// loading component for suspense fallback
const Loader = () => (
    <div>loading...</div>
);

export default class Routes extends Component {
    render() {
        return (
            <Suspense fallback={<Loader />} >
                <Router>

                    <App>
                        {this.props.children}
                        <Route path="/online/" component={Online} />
                    </App>
                </Router>
            </Suspense>
        );
    }
}
