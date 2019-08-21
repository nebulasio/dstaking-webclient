import React, { Component } from 'react'
import { useTranslation } from 'react-i18next';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import classnames from 'classnames';
import StakingQuery from 'components/common/staking_query'
import StakingParam from 'components/common/staking_param'

import { Button, ButtonOutline, Group, InputTextBlock, Textarea } from 'components/common/base'
import { MdFileUpload } from "react-icons/md";

const Wrapper = styled.div`
    padding: 20px 0 0;
    background-color: #F2F3F8;

    .nav {
        justify-content: center;

        .nav-item {
            .nav-link {
                border-radius: 0;
                font-size:14px;
                line-height: 16px;
                font-weight:500;
                padding: 14px 20px;
                background-color: #F0F0F0;
                border:1px solid ${(props) => props.theme.borderColor};

                &.active {
                    background-color: #fff;
                    font-weight:500;
                    color: ${(props) => props.theme.primaryColor};
                    border-bottom: 1px solid #fff;
                }
            }
        }
    }

    .tab-content {
        background-color: #fff;
        padding: 40px 135px;
    }
`

const StatusTitle = styled.h3`
    margin-bottom: 2rem;
    text-align: center;
    font-size:14px;
    color: #8F90AC;
`

const UploadButtonText = styled.button`
    background: #fff !important;
    border: none;
    color:#999;
    font-size:14px;

    svg {
        margin-bottom: 2px;
        margin-right: 4px;
        color: ${(props) => props.theme.primaryColor};
    }
`

class Offline extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '3'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <Wrapper>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            获取账户信息
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            离线生成交易
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            发送交易
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <StatusTitle>Online Computer</StatusTitle>
                        <StakingQuery />
                        <Group>
                            <ButtonOutline>去生成交易</ButtonOutline>
                        </Group>
                    </TabPane>
                    <TabPane tabId="2">
                        <StatusTitle>Offline Computer</StatusTitle>
                        <ButtonOutline block><MdFileUpload size="14px" />选择 Keystore 文件</ButtonOutline>

                        <Group margin="20px auto">
                            <InputTextBlock placeholder="输入密码" />
                        </Group>

                        <Group>
                            <StakingParam />

                            <Group>
                                <Button block>生成文件</Button>
                            </Group>

                            <Textarea rows="7" defaultValue="CiByCW4akOtKZ6PkhNq4EU8ekrwVFAKHG2Pa8VHHq78t3BIaGVcc8rvmYZhpdDRv+Ud8QihniPgwmedgeHgaGhlYatudy0V86tqEws8c5cSUgm7h2Bi+UWpYIhAAAAAAAAAAAIrHIwSJ6AAAKAkwte/p6gU6KQoEY2FsbBIheyJGdW5jdGlvbiI6InBsZWRnZSIsIkFyZ3MiOiJbXSJ9QAFKEAAAAAAAAAAAAAAABKgXyABSEAAAAAAAAAAAAAAAAAADDUBYAWJBAGS/vSayWj1hqyHcdyOvcq3RNOgNBf1JS+56QoGU/nR+HQSY47g18WumSFjee+D0e8x9TnsIbddQZPGhwMdcigA=" />

                            <Group margin="20px auto">
                                <Button block>保存文件</Button>
                            </Group>

                        </Group>
                    </TabPane>
                    <TabPane tabId="3">
                        <StatusTitle>Onine Computer</StatusTitle>

                        <Textarea rows="7" placeholder="请粘贴离线生成的 raw transaction"></Textarea>
                        <UploadButtonText><MdFileUpload size="14px" /> 上传离线生成的 raw transaction</UploadButtonText>

                        <Group margin="20px auto">
                            <Button block>发送交易</Button>
                        </Group>

                    </TabPane>
                </TabContent>
            </Wrapper>
        )
    }

}

export default Offline;