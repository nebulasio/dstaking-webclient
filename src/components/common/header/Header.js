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
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import styled from 'styled-components';
import { IoIosGlobe } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import logo from "assets/images/nax.png"

const Wrapper = styled.div`
    & > nav {
        height: 80px;
        background-color: rgba(255,255,255,1);
        box-shadow: 0px -1px 0px 0px rgba(239,239,239,1);

        .navbar-brand {
            line-height: 30px;
            font-size: 16px;

            .logo {
                width: 26px;
                height: auto;
                margin-right: 10px;
            }
        }

        .navbar-nav {
            .nav-link {
                color: #000;
                line-height: 1;
            }
        }
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

const ButtonText = styled.button`
    background: #fff !important;
    border: none;
    color:#333;
    font-size:14px;

    svg {
        margin-bottom: 2px;
        margin-right: 4px;
    }

    &:focus {
        box-shadow: none;
        outline: 0;
    }
`


function Header() {

    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <Navbar light expand="md">
                <Container>
                    <NavbarBrand href="/">
                        <img className="logo" src={logo} />
                        NAX dStaking
                    </NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <IoIosGlobe />中文
                            </DropdownToggle>
                            <DropdownMenu right>

                                <DropdownItem onClick={() => i18n.changeLanguage('en')}>
                                    EN
                                </DropdownItem>
                                <DropdownItem onClick={() => i18n.changeLanguage('zh-CN')}>
                                    中文
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </Wrapper>
    );

}

export default Header;
