import React from 'react'
import { Button, InputGroup, Input, InputGroupAddon } from 'reactstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
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


function StakingQuery() {
    return (
        <Wrapper>
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
        </Wrapper>
    )
}

export default StakingQuery;