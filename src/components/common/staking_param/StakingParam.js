import React from 'react'
import { InputGroup, Input, InputGroupAddon, InputGroupText, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import media from 'components/common/base/media';

const Wrapper = styled.div`
    .form-row {
        margin-bottom: 12px;

        .col-md-6 {
            ${media.tablet`
                margin-bottom: 1rem;
            `}
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
`

function StakingParam(props) {

    const { stakingAmount, stakingSelect, stakingNonce, min_staking_amount } = props;
    const { t } = useTranslation("common");

    return (
        <Wrapper>
            <Row form>
                <Col md={6}>
                    <Input type="select" name="stakingSelect" onChange={props.onChange}>
                        <option value="1">{t("staking")}</option>
                        <option value="0">{t("cancel staking")}</option>
                    </Input>
                </Col>
                {stakingSelect === "1" ?
                    <Col md={6}>
                        <InputGroup>
                            <Input type="text" name="stakingAmount" placeholder={t("min staking") + min_staking_amount} value={stakingAmount} onChange={props.onChange} />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>NAS</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col> : null
                }

            </Row>

            {props.type === "offline" &&
                <Row form>
                    <Col md={6}>
                        <InputGroup>
                            <Input type="text" name="stakingNonce" value={stakingNonce} onChange={props.onChange} />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>Nonce</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>

                </Row>
            }


        </Wrapper>
    );
}

StakingParam.defaultProps = {
    type: "online"
}

export default StakingParam;