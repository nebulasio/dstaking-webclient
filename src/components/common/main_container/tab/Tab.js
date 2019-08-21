import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const Wrapper = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
`
const TabList = styled.div`
    display: flex;
    justify-content: center;
    & > a {
        font-size:18px;
        font-family:PingFangSC;
        font-weight:400;
        color: #333;
        margin: 0 60px;
        padding: 24px 0;

        &.selected {
            color: ${(props) => props.theme.primaryColor};
            border-bottom: 2px solid ${(props) => props.theme.primaryColor};
        }

        &:hover {
            color: ${(props) => props.theme.primaryColor};
            text-decoration: none;
        }
    }
`


export default class Tab extends Component {
    render() {
        return (
            <Wrapper>
                <TabList>
                    <NavLink to="/online/" activeClassName="selected">在线质押</NavLink>
                    <NavLink to="/offline/" activeClassName="selected">离线质押</NavLink>
                </TabList>
            </Wrapper>
        )
    }
}
