import React from 'react'
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

function Online() {

    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <Form>
                <FormGroup>
                    <Label for="input-staking-status-query">质押状态查询</Label>
                    <StakingQuery />
                </FormGroup>

                <FormGroup>
                    <Label>质押</Label>
                    <StakingParam />
                </FormGroup>

                <FormGroup>
                    <CustomInput type="radio" id="radio-nas-nano" name="radio-staking-start" label="NAS nano" />
                    <CustomInput type="radio" id="radio-nas-ext" name="radio-staking-start" label="NAS chrome extension" />
                </FormGroup>

                <FormGroup>
                    <Button color="primary" size="lg" block onClick={e => { e.preventDefault() }}>质押</Button>
                    <Button color="secondary" size="lg" disabled block onClick={e => { e.preventDefault() }}>质押</Button>
                </FormGroup>

                <QRCodeWrapper>
                    <QRCode size={140} value="http://facebook.github.io/react/" />
                    <QRCodeText>
                        <h3>请使用 Nas nano pro 扫码</h3>
                        <p>注意调用的钱包地址和查询地址的一致性</p>
                        <a href="hhttps://nano.nebulas.io/">下载 Nas nano pro ></a>
                    </QRCodeText>
                </QRCodeWrapper>

            </Form>
        </Wrapper>
    )

}

export default Online;
