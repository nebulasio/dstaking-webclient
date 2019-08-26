import React, { Component } from 'react'
import { Container } from 'reactstrap';
import styled from 'styled-components';
import Tab from './tab';
import media from 'components/common/base/media';

const Wrapper = styled.div`
    margin: 40px auto;
    width:750px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(239,239,239,1);
    font-family: ${props => props.theme.fontFamily};

    ${media.tablet`
        width: auto;
    `}
`



export default class MainContainer extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Wrapper>
                        <Tab />
                        {this.props.children}
                    </Wrapper>
                </Container>
            </div>
        )
    }
}
