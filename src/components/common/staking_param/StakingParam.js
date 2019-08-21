import React from 'react'
import { InputGroup, Input, InputGroupAddon, InputGroupText, Row, Col } from 'reactstrap';
import styled from 'styled-components';

const Wrapper = styled.div`

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

function StakingParam() {
    return (
        <Wrapper>
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
        </Wrapper>
    );
}

export default StakingParam;