import React, { Component } from 'react'
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import styled from 'styled-components';
import { IoIosGlobe } from "react-icons/io";

const Wrapper = styled.div`
    & > nav {
        height: 80px;
        background-color: rgba(255,255,255,1);
        box-shadow: 0px -1px 0px 0px rgba(239,239,239,1);
    }
`

const Label = styled.label`
    height:20px;
    font-size:14px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(0,0,0,1);
    line-height:20px;
    & > svg {
        width: 14px;
        height: 14px;
    }
`

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <Wrapper>
                <Navbar light expand="md">
                    <Container>
                        <NavbarBrand href="/">NAX Staking</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Label><IoIosGlobe /> 中文</Label>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </Wrapper>
        );
    }
}
