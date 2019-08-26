import React, { Component } from 'react'
import { Button, InputGroup, Input, InputGroupAddon } from 'reactstrap';
import styled from 'styled-components';
import { Neb } from 'utils';
import { Spinner } from 'reactstrap';
import { withTranslation } from 'react-i18next';

const Wrapper = styled.div`
    .spinner-grow {
        margin: 20px auto;
        text-align: center;
        display: block;
    }

    .input-group > input[type=text] {
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
    grid-template-columns: repeat(3, auto);
    margin-top: 20px;
    padding: 18px 14px;
    background-color: ${(props) => props.theme.resultBackgroundColor};
    height: auto;
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


class StakingQuery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nasAddr: "",
            nasBalance: "",
            nasStaking: "",
            nonce: "",
            loading: false,
        }

        this.neb = new Neb();
    }

    OnInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleQuery = async (e) => {
        e.preventDefault();

        const { t } = this.props;
        const { nasAddr } = this.state;

        if (!nasAddr) {
            window.alert(t("wallet address can not empty"));
            return false;
        }

        try {

            this.setState({
                loading: true
            });

            const { nasBalance, nasStaking, nonce } = await this.neb.getStakingStatus(nasAddr);

            this.setState({
                loading: false
            });

            this.setState({
                nasBalance,
                nasStaking,
                nonce
            });

        } catch (err) {
            console.error(err);
        }

    }


    render() {

        const { nasAddr, nasBalance, nasStaking, nonce, loading } = this.state;
        const { t, type } = this.props;

        const showResult = () => {
            if (nasBalance && nasStaking) {
                return (
                    <ResultWrapper>
                        <ResultItem>
                            <label>{t("wallet balance")}</label>
                            <p>{nasBalance} NAS</p>
                        </ResultItem>

                        <ResultItem>
                            <label>{t("already staking")}</label>
                            <p>{nasStaking} NAS</p>
                        </ResultItem>

                        {type === "offline" &&
                            <ResultItem>
                                <label>Nonce</label>
                                <p>{nonce}</p>
                            </ResultItem>
                        }

                    </ResultWrapper>
                );
            } else {
                return null;
            }
        }

        return (
            <Wrapper>
                <InputGroup>
                    <Input type="text" name="nasAddr" placeholder={t("type wallet address")} value={nasAddr} onChange={this.OnInputChange} />
                    <InputGroupAddon addonType="append"><Button onClick={this.handleQuery}>{t("query")}</Button></InputGroupAddon>
                </InputGroup>

                {loading ? <Spinner type="grow" color="light" /> : showResult()}

            </Wrapper>
        );
    }

}

StakingQuery.defaultProps = {
    type: "online" // online, offline
}

export default withTranslation(['common'])(StakingQuery);