import React, { Component } from 'react';
import Header from 'components/common/header'
import MainContainer from 'components/common/main_container'
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';

const Wrapper = styled.div`
  background-color: #FAFAFC;
  height:100vh;
  min-height:100vh;
`

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Header />
          <MainContainer>
            {this.props.children}
          </MainContainer>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

