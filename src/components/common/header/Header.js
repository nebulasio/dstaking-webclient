import React, { useState } from 'react'
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
import { IoIosGlobe, IoMdDownload } from "react-icons/io";
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
            font-family: ${props => props.theme.fontFamily};

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

                svg {
                    vertical-align: middle;
                }

                &.dropdown-toggle::after {
                    vertical-align: middle;
                }
            }
        }
    }
`


function Header() {

    const { t, i18n } = useTranslation("common");

    const [isOpen, setIsOpen] = useState(false);


    function showCurrentLanguage() {
        if (i18n.language === "zh-CN") {
            return "中文";
        } else {
            return "EN";
        }
    }

    function HandleToggle() {
        return setIsOpen(!isOpen);
    }

    return (
        <Wrapper>
            <Navbar light expand="md">
                <Container>
                    <NavbarBrand href="/">
                        <img className="logo" src={logo} />
                        NAX dStaking
                    </NavbarBrand>
                    <NavbarToggler onClick={HandleToggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                 <NavLink href={process.env.REACT_APP_RELEASE_URL}><IoMdDownload /> {t("download")}</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <IoIosGlobe /> {showCurrentLanguage()}
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
                    </Collapse>
                </Container>
            </Navbar>
        </Wrapper>
    );

}

export default Header;
