import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import classnames from 'classnames';
import StakingQuery from 'components/common/staking_query'
import StakingParam from 'components/common/staking_param'

import { Button, ButtonOutline, Group, InputText, Textarea, Errmsg, TextGroup } from 'components/common/base'
import { MdFileUpload } from "react-icons/md";
import { Neb } from 'utils';
import { saveAs } from 'file-saver';

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

const FileWrapper = styled.div`
    margin-top: 20px;
    color:#666;
    font-size:14px;
    & > p {
        color: #8F90AC;
        margin: 0;
        line-height: 1;

        & label {
            color: #666;
            font-size:14px;
            font-weight: 500;
            margin-right: 4px;
        }
    }

`

const min_staking_amount = process.env.REACT_APP_STAKING_MIN;

class Offline extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1', // 1:staking status query, 2: create offline raw transaction, 3: send raw transaction
            keystoreContent: "",
            keystoreFilename: "",
            rawTransaction: "",
            accountPwd: "",
            accountPwdErr: false,

            showInputPwdPanel: false,
            showStakingParamPanel: false,
            stakingAmount: min_staking_amount,
            stakingSelect: "1", // 1:staking, 0:cancel staking
            stakingNonce: "",
            offlineRawTransaction: ""

        };

        this.account = null;
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            accountPwdErr: false,
        });
    }

    handleSelectKeystore = e => {

        const { t } = this.props;

        e.preventDefault();

        this._onClickReadFile((event, file) => {
            try {

                let keystore = JSON.parse(event.target.result);

                // detect is correct keystore format
                if ('address' in keystore) {
                    let fileName = file.name;

                    this.setState({
                        keystoreContent: keystore,
                        keystoreFilename: fileName,
                        showInputPwdPanel: true,
                    });

                    // console.log(keystore, fileName);
                }

            } catch (ex) {
                // window.alert(ex);
                window.alert(t('keystore format wrong'));
            }
        });

    }

    handleConfirmPwd = e => {
        const { t } = this.props;
        const { keystoreContent, accountPwd } = this.state;
        try {
            this.account = Neb.account(keystoreContent, accountPwd);

            this.setState({
                showInputPwdPanel: false, // hide input pwd panel
                showStakingParamPanel: true
            });

        } catch (err) {

            this.setState({
                accountPwdErr: true
            });

            window.alert(t('wrong password'));

        }
    }

    isValidPwd = () => {
        const { accountPwd } = this.state;

        if (accountPwd) {
            return true;
        } else {
            return false;
        }
    }

    isValidCreateRawTransactionParam = () => {
        const { stakingAmount, stakingNonce } = this.state;
        if (parseInt(stakingAmount) >= parseInt(min_staking_amount) && !isNaN(parseInt(stakingNonce))) {
            return true;
        } else {
            return false;
        }

    }

    handleCreateRawTransaction = e => {
        const { stakingAmount, stakingSelect, stakingNonce } = this.state;
        try {
            const rawTx = Neb.generateStakingRawTransaction(this.account, stakingSelect, stakingAmount, stakingNonce);
            console.log(rawTx);

            this.setState({
                rawTransaction: rawTx
            });

        } catch (err) {
            window.alert(err);
        }
    }

    handleSaveToFile = () => {
        const blob = new Blob([this.state.rawTransaction], { type: "application/text; charset=utf-8" });
        saveAs(blob, `raw_transaction_${Date.now()}.txt`);
    }

    handleSendRawTransction = async () => {

        try {
            const neb = new Neb();
            const res = await neb.sendRawTransaction(this.state.offlineRawTransaction);
            console.log(res);
        } catch (err) {
            window.alert(err);
        }
    }

    handleUploadRawTransaction = e => {
        e.preventDefault();

        this._onClickReadFile(event => {
            // console.log(event.target.result);
            this.setState({
                offlineRawTransaction: event.target.result
            });

        });
    }

    _onClickReadFile = onload => {
        // creating input[type=file] element
        const inputFile = document.createElement("input");
        inputFile.setAttribute("type", "file");

        // add onchange listener to inputFile
        inputFile.addEventListener("change", e => {
            let file = e.target.files[0];
            let fr = new FileReader();
            fr.onload = e => onload(e, file);
            // raed file as text
            fr.readAsText(file);
        });

        // click inputFile
        inputFile.click(); // opening dialog
        return false; // avoiding navigation
    }

    render() {
        const { t, i18n } = this.props;
        const { keystoreContent, keystoreFilename, rawTransaction, accountPwd, accountPwdErr, showInputPwdPanel, showStakingParamPanel, offlineRawTransaction } = this.state;

        return (
            <Wrapper>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            {t('get account state')}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            {t('generate offline  raw tx')}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            {t('send tx')}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <StatusTitle>{t('online computer')}</StatusTitle>
                        <StakingQuery type="offline" />
                    </TabPane>
                    <TabPane tabId="2">
                        <StatusTitle>{t('offline computer')}</StatusTitle>

                        <ButtonOutline block onClick={this.handleSelectKeystore}><MdFileUpload size="14px" />
                            {t('select keystore')}
                        </ButtonOutline>


                        {keystoreFilename && keystoreContent &&
                            <TextGroup>
                                <p> <label>{t('file name')}:</label> {keystoreFilename}</p>
                                <p> <label>{t('nas address')}:</label> <input type="text" defaultValue={keystoreContent.address} /></p>
                            </TextGroup>
                        }

                        {/* when keystore is correct, show input password panel*/}
                        {showInputPwdPanel &&
                            <>
                                <Group margin="20px auto">
                                    <InputText block className={accountPwdErr ? "error" : ""} type="password" placeholder={t('type password')} name="accountPwd"
                                        value={accountPwd} onChange={e => this.handleOnChange(e)} />
                                    {accountPwdErr && <Errmsg>{t('wrong password')}</Errmsg>}
                                </Group>

                                <Group margin="20px auto">
                                    <Button disabled={!this.isValidPwd()} block onClick={this.handleConfirmPwd}>{t('comfirm')}</Button>
                                </Group>
                            </>
                        }

                        {/* when pwd is correct, show below */}
                        {showStakingParamPanel &&
                            <Group margin="20px auto">
                                <StakingParam type="offline" {...this.state} onChange={e => this.handleOnChange(e)} min_staking_amount={min_staking_amount} />

                                <Group margin="20px auto">
                                    <Button disabled={!this.isValidCreateRawTransactionParam()} block onClick={this.handleCreateRawTransaction}>{t('generate raw tx')}</Button>
                                </Group>
                            </Group>
                        }

                        {rawTransaction &&
                            <Group>
                                <Textarea rows="7" value={rawTransaction} />
                                <Group margin="20px auto">
                                    <Button onClick={this.handleSaveToFile} block>{t('save file')}</Button>
                                </Group>
                            </Group>
                        }
                    </TabPane>
                    <TabPane tabId="3">
                        <StatusTitle>{t('online computer')}</StatusTitle>

                        <Textarea rows="7" placeholder={t('type raw tx')} name="offlineRawTransaction" value={offlineRawTransaction} onChange={this.handleOnChange}></Textarea>
                        <UploadButtonText onClick={this.handleUploadRawTransaction}><MdFileUpload size="14px" /> {t('upload tx file')}</UploadButtonText>

                        <Group margin="20px auto">
                            <Button disabled={offlineRawTransaction ? false : true} block onClick={this.handleSendRawTransction}>{t('send tx')}</Button>
                        </Group>

                    </TabPane>
                </TabContent>
            </Wrapper>
        )
    }

}

export default withTranslation(['offline'])(Offline);