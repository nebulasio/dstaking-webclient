import React, { Component } from 'react'
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import styled from 'styled-components';
import { IoIosGlobe } from "react-icons/io";
import { useTranslation } from 'react-i18next';

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


export default function Header() {

    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <Navbar light expand="md">
                <Container>
                    <NavbarBrand href="/">NAX Staking</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            {/* <NavLink href="#" onClick={() => { i18n.changeLanguage('zh-CN') }}><Label><IoIosGlobe /> 中文</Label></NavLink> */}
                            <button onClick={() => i18n.changeLanguage('zh-CN')}>zh-CN</button>
                            <button onClick={() => i18n.changeLanguage('en')}>en</button>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>
        </Wrapper>
    );

}
