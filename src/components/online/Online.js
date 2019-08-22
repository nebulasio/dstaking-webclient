import React, { Component } from 'react'
import { useTranslation } from 'react-i18next';
import { Button, Form, FormGroup, Label, InputGroup, Input, InputGroupAddon, InputGroupText, CustomInput, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import StakingQuery from 'components/common/staking_query'
import StakingParam from 'components/common/staking_param'

const Wrapper = styled.div`
    margin: 40px 135px;

    .form-group {
        margin-bottom: 2rem;
        & > label {
            display: block;
            font-size:20px;
            font-family:PingFangSC;
            font-weight:600;
        }
    
        .custom-control {
            display: inline-block;
            margin-right: 1rem;

            .custom-control-input:checked~.custom-control-label {
                &::before {
                    border-color: ${(props) => props.theme.primaryColor};
                    background-color: ${(props) => props.theme.primaryColor};
                }
            }
        }

        .btn-block {
            height: 56px;
            font-size:16px;
            font-family:PingFangSC;
            font-weight:500;
            border-radius: 0;

            &.btn-primary {
                border-color: ${(props) => props.theme.primaryColor};
                background-color: ${(props) => props.theme.primaryColor};

                &:focus, &:active:focus {
                    box-shadow: none;
                }
    
                &:hover, &:active {
                    background-color: ${(props) => props.theme.primaryHoverColor};
                }
            }

            &.btn-secondary.disabled {
                background-color: #CED0D9;
                border-color: #CED0D9;
            }
        }
    }
`

const QRCodeWrapper = styled.div`
    display: flex;
    background:rgba(255,255,255,1);
    box-shadow:0px 20px 60px 0px rgba(134,141,167,0.2);
    border:1px solid rgba(230,231,235,1);
    padding: 10px;
`

const QRCodeText = styled.div`
    margin: 10px auto;

    h3 {
        font-size:16px;
        font-family:PingFangSC;
        font-weight:500;
    }

    p {
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(102,102,102,1);
    }

    a {
        font-size:13px;
        color: ${(props) => props.theme.primaryColor};

        &:hover {
            color: ${(props) => props.theme.primaryHoverColor};
            text-decoration: none;
        }
    }
`

const min_staking_amount = 5;
const staking_proxy_contract = process.env.REACT_APP_STAKING_PROXY_CONTRACT;

class Online extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stakingType: "",
            stakingAmount: min_staking_amount,
            stakingSelect: "1", // 1:staking, 0:cancel staking
            showQrcode: false,
        }
    }

    handleStakingType = e => {
        this.setState({
            stakingType: e.target.id.split("radio-")[1]
        });
    }


    handleChangeCustomStaking = e => {

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isDisableSubmit() {

        const { stakingAmount, stakingSelect } = this.state;

        if (stakingSelect === "0") {
            return false;
        }

        if (stakingAmount < min_staking_amount) {
            return true;
        } else {
            return false;
        }

    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({
            showQrcode: true
        });
    }


    render() {

        const { stakingType, stakingSelect, showQrcode } = this.state;

        // custom stking nas amount, cancel staking
        const CustomStaking =
            <>
                <FormGroup>
                    <StakingParam {...this.state} onChange={this.handleChangeCustomStaking} minStaking={min_staking_amount} />
                </FormGroup>

                {stakingSelect === "1" &&
                    <FormGroup>
                        <Button color="primary" size="lg" disabled={this.isDisableSubmit()} block onClick={this.handleSubmit}>质押</Button>
                    </FormGroup>
                }

                {showQrcode &&
                    <QRCodeWrapper>
                        <QRCode size={140} value="http://facebook.github.io/react/" />
                        <QRCodeText>
                            <h3>请使用 Nas nano pro 扫码</h3>
                            <p>注意调用的钱包地址和查询地址的一致性</p>
                            <a href="hhttps://nano.nebulas.io/">下载 Nas nano pro ></a>
                        </QRCodeText>
                    </QRCodeWrapper>
                }

            </>

        const ThirdStaking = <>
            <label>转账地址: {staking_proxy_contract}</label>
            <label>转账金额: 0 NAS</label>

            <QRCodeWrapper>
                <QRCode size={140} value={staking_proxy_contract} />
                <QRCodeText>
                    <h3>请使用三方钱包扫码</h3>
                    <a href="https://nebulas.io/wallets.html">下载三方钱包 ></a>
                </QRCodeText>
            </QRCodeWrapper>
        </>

        const showStakingPanel = () => {
            if (stakingType === "nas-nano" || stakingType === "nas-ext") {
                return CustomStaking;
            } else if (stakingType === "third-wallet") {
                return ThirdStaking;
            } else {
                return null;
            }
        }

        return (
            <Wrapper>
                <Form>
                    <FormGroup>
                        <Label>质押状态查询</Label>
                        <StakingQuery />
                    </FormGroup>

                    <FormGroup>
                        <Label>质押方式</Label>
                        <CustomInput onClick={e => this.handleStakingType(e)} type="radio" id="radio-nas-nano" name="radio-staking-start" label="NAS nano" />
                        <CustomInput onClick={e => this.handleStakingType(e)} type="radio" id="radio-nas-ext" name="radio-staking-start" label="NAS chrome extension" />
                        <CustomInput onClick={e => this.handleStakingType(e)} type="radio" id="radio-third-wallet" name="radio-staking-start" label="三方钱包" />
                    </FormGroup>

                    {showStakingPanel()}

                </Form>
            </Wrapper>
        )
    }

}

export default Online;
