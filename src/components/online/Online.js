import React from 'react'
import { useTranslation } from 'react-i18next';
import { Button, Form, FormGroup, Label, InputGroup, Input, InputGroupAddon, InputGroupText, CustomInput, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import QRCode from 'qrcode.react'

const Wrapper = styled.div`
    .form-group {
        margin-bottom: 2rem;
        & > label {
            font-size:20px;
            font-family:PingFangSC;
            font-weight:600;
        }
    
        .input-group > input[name=input-staking-status-query] {
            border: none;
            border-radius: 0;
            border-bottom: 1px solid ${(props) => props.theme.borderColor};

            &::placeholder {
                color: ${(props) => props.theme.inputPlaceholderColor};
            }
    
            &:focus {
                box-shadow: none;
            }
        }
    
        .input-group-append > button {
            border: none;
            border-radius: 0;
            border-bottom: 1px solid ${(props) => props.theme.borderColor};
            background-color: #fff;
            color: ${(props) => props.theme.primaryColor};
            font-size:14px;
            font-family:PingFangSC;
            font-weight:500;
    
            &:focus {
                box-shadow: none;
            }
    
            &:active {
                box-shadow: none;
                border: none;
                border-radius: 0;
                border-color: ${(props) => props.theme.borderColor} !important;
                border-bottom: 1px solid ${(props) => props.theme.borderColor};
                background-color: #fff !important;
                color: ${(props) => props.theme.primaryColor} !important;
            }
    
            &:active:focus {
                box-shadow: none !important;
            }
        }
    
        select {
            border-radius: 0;
            height: ${(props) => props.theme.inputHeight};
    
            &:focus {
                box-shadow: none !important;
                border-color: #ccc;
            }
    
        }
    
        .form-row {
            input[type=text] {
                height: ${(props) => props.theme.inputHeight};
                border-radius: 0;
                border-right: none;

                &::placeholder {
                    color: ${(props) => props.theme.inputPlaceholderColor};
                }
    
                &:focus {
                    box-shadow: none !important;
                    border-color: #ccc;
                }
            }
    
            .input-group-append {
                .input-group-text {
                    border-radius: 0;
                    background-color: #fff;
                }
            } 
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

const ResultWrapper = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    margin-top: 20px;
    padding: 18px 14px;
    background-color: ${(props) => props.theme.resultBackgroundColor};
    height: 56px;
`

const ResultItem = styled.div`
    display: flex;
    label {
        color: #666666;
        font-size:14px;
        margin: 0 8px 0 0;
    }

    p {
        color: #000;
        font-weight:500;
        font-size:14px;
        margin: 0;
    }
`



function Online() {

    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <Form>
                <FormGroup>
                    <Label for="input-staking-status-query">质押状态查询</Label>
                    <InputGroup>
                        <Input type="text" name="input-staking-status-query" id="input-staking-status-query" placeholder="输入钱包地址" />
                        <InputGroupAddon addonType="append"><Button onClick={(e) => { e.preventDefault() }}>查询</Button></InputGroupAddon>
                    </InputGroup>

                    <ResultWrapper>
                        <ResultItem>
                            <label>NAS余额</label>
                            <p>0 NAS</p>
                        </ResultItem>

                        <ResultItem>
                            <label>已质押</label>
                            <p>0 NAS</p>
                        </ResultItem>
                    </ResultWrapper>


                </FormGroup>

                <FormGroup>
                    <Label>质押</Label>
                    <Row form>
                        <Col md={6}>
                            <Input type="select" name="select-staking">
                                <option>质押</option>
                                <option>取消质押</option>
                            </Input>
                        </Col>
                        <Col md={6}>
                            <InputGroup>
                                <Input type="text" name="input-staking-nas" placeholder="输入要质押的数量" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>NAS</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row>
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
