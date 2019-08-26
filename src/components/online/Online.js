import React, { Component } from 'react'
import { useTranslation } from 'react-i18next';
import { Button, Form, FormGroup, Label, InputGroup, Input, InputGroupAddon, InputGroupText, CustomInput, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import StakingQuery from 'components/common/staking_query'
import StakingParam from 'components/common/staking_param'
import { Neb } from 'utils';
import NebPay from "nebpay.js";
import nebulas from 'nebulas';
import { Group, TextGroup } from 'components/common/base';

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

const min_staking_amount = process.env.REACT_APP_STAKING_MIN;
const staking_proxy_contract = process.env.REACT_APP_STAKING_PROXY_CONTRACT;
class Online extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stakingType: "",
            stakingAmount: min_staking_amount,
            stakingSelect: "1", // 1:staking, 0:cancel staking
            showQrcode: false,
            qrcodeText: "",
        }
    }

    handleStakingType = e => {
        this.setState({
            stakingType: e.target.id.split("radio-")[1]
        }, () => {
            const { stakingAmount, stakingSelect, stakingType } = this.state;

            if (stakingType === "nas-ext") {
                this.setState({
                    showQrcode: false,
                });

            } else if (stakingType === "third-wallet") {
                // re-generate qrcode
                this.setState({
                    qrcodeText: Neb.generateQrcode("1", "0", stakingType)
                });
            }
        });
    }


    handleChangeCustomStaking = e => {

        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            const { stakingSelect, stakingType } = this.state;

            if (stakingType === "nas-nano") {
                this.setState({
                    showQrcode: true,
                });
            }

            if (stakingSelect === "0") {
                // re-generate qrcode
                this.setState({
                    qrcodeText: Neb.generateQrcode("0", "0", stakingType),
                });
            }
        });

    }

    isDisableSubmit() {

        const { stakingAmount, stakingSelect } = this.state;

        if (stakingSelect === "0") {
            return false;
        }

        if (parseInt(stakingAmount) < parseInt(min_staking_amount)) {
            return true;
        } else {
            return false;
        }

    }

    handleSubmit = e => {
        e.preventDefault();

        const { stakingAmount, stakingSelect, stakingType } = this.state;

        if (stakingType === "nas-nano") {

            this.setState({
                showQrcode: true,
            });

        } else if (stakingType === "nas-ext") {

            const nebPay = new NebPay();
            // set default gas price, limit
            const gasPrice = 2 * Math.pow(10, 10);
            const gasLimit = 200000;

            const actions = ["cancel", "staking"];
            let value;
            if (stakingSelect === "1") { // staking
                value = nebulas.Unit.nasToBasic(stakingAmount);
            } else { // cancel staking
                value = ""
            }

            nebPay.call(staking_proxy_contract, 0, actions[stakingSelect], `[${value}]`, {
                qrcode: {
                    showQRCode: true
                },
                extension: {
                    openExtension: true
                },

                gasPrice,
                gasLimit,
                listener: (serialNumber, resp) => { console.log(serialNumber, resp); }
            });

        }

        this.setState({
            qrcodeText: Neb.generateQrcode(stakingSelect, stakingAmount, stakingType)
        });
    }

    render() {

        const { stakingType, stakingSelect, showQrcode, qrcodeText } = this.state;

        // custom stking nas amount, cancel staking
        const CustomStaking =
            <>
                <FormGroup>
                    <StakingParam {...this.state} onChange={this.handleChangeCustomStaking} min_staking_amount={min_staking_amount} />
                </FormGroup>

                {stakingType === "nas-ext" &&
                    <TextGroup>
                        <a href="https://chrome.google.com/webstore/detail/nasextwallet/gehjkhmhclgnkkhpfamakecfgakkfkco" target="__blank">
                            获取 NasExtWallet
                        </a>
                    </TextGroup>
                }

                {(stakingSelect === "1" || stakingType === "nas-ext") &&
                    <FormGroup>
                        <Button color="primary" size="lg" disabled={this.isDisableSubmit()} block onClick={this.handleSubmit}>质押</Button>
                    </FormGroup>
                }

                {showQrcode &&
                    <QRCodeWrapper>
                        <QRCode size={140} value={qrcodeText} />
                        <QRCodeText>
                            <h3>请使用 Nas nano pro 扫码</h3>
                            <p>注意调用的钱包地址和查询地址的一致性</p>
                            <a href="hhttps://nano.nebulas.io/">下载 Nas nano pro ></a>
                        </QRCodeText>
                    </QRCodeWrapper>
                }

            </>

        const ThirdStaking = <>
            <TextGroup>
                <p><label>转账地址: </label><input type="text" defaultValue={staking_proxy_contract} /></p>
                <p><label>转账金额: </label> 0 NAS</p>
                <p><label>质押金额: </label> 默认为该钱包内所有 NAS 余额</p>

            </TextGroup>

            <QRCodeWrapper>
                <QRCode size={140} value={qrcodeText} />
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
                        <CustomInput onClick={e => this.handleStakingType(e)} type="radio" id="radio-nas-ext" name="radio-staking-start" label="Nebulas 谷歌插件" />
                        <CustomInput onClick={e => this.handleStakingType(e)} type="radio" id="radio-third-wallet" name="radio-staking-start" label="三方钱包" />
                    </FormGroup>

                    {showStakingPanel()}

                </Form>
            </Wrapper>
        )
    }

}

export default Online;
