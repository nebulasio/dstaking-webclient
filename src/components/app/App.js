import React, { Component } from 'react';
import Header from 'components/common/header'
import MainContainer from 'components/common/main_container'
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';
import nextdao_dark from 'assets/images/nextdao_dark.png';

const Wrapper = styled.div`
  background-color: #FAFAFC;
  min-height: calc(100vh - 100px);
`

const Footer = styled.footer`
height: 100px;
display: flex;
text-align: center;
justify-content: center;
align-items: center;

  img {
    margin-left: 0.5rem;
    height: 1rem;
    width: auto;
  }
`

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <Wrapper>
            <Header />
            <MainContainer>
              {this.props.children}
            </MainContainer>
          </Wrapper>
          <Footer>
            <sapn>Powered By </sapn><a href="https://nextdao.io" target="__blank"><img src={nextdao_dark} alt="nextDAO" /></a>
          </Footer>
        </>
      </ThemeProvider>
    );
  }
}

