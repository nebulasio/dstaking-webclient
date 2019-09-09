import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from 'components/app';
import Online from "./online"
import Offline from "./offline"
import styled from 'styled-components';
import { Spinner } from 'reactstrap';

const Loading = styled.div`
    width: 200px;
    height: 200px;
    position:absolute;
    left:0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    text-align: center;
`

// loading component for suspense fallback
const Loader = () => (
    <Loading>
        <Spinner style={{ width: '3rem', height: '3rem' }} />
    </Loading>
);

export default class Routes extends Component {
    render() {
        return (
            <Suspense fallback={<Loader />} >
                <Router>

                    <App>
                        {this.props.children}
                        <Switch>
                            <Route path="/" exact component={Online} />
                            <Route path="/online/" component={Online} />
                            <Route path="/offline/" component={Offline} />
                        </Switch>
                    </App>
                </Router>
            </Suspense>
        );
    }
}
