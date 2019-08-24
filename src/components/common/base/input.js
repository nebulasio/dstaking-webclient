import styled from 'styled-components';

const InputText = styled.input`
    height: ${(props) => props.theme.inputHeight};
    border:  1px solid ${(props) => props.theme.borderColor};
    padding: 14px 18px;
    font-size:14px;
    width: ${ props => props.block ? "100%" : "auto"};
    display: ${ props => props.block ? "block" : "auto"};

    &.error {
        border: 1px solid ${(props) => props.theme.errorColor};
    }

    &:focus {
        box-shadow: none;
        outline: 0;
    }

    &::placeholder {
        color: #999999;
    }
`

const Textarea = styled.textarea`
    border:  1px solid ${(props) => props.theme.borderColor};
    padding: 14px 18px;
    font-size:14px;
    width: 100%;

    &:focus {
        box-shadow: none;
        outline: 0;
    }

    &::placeholder {
        color: #999999;
    }
`

const Errmsg = styled.span`
    color: ${(props) => props.theme.errorColor};
    font-size: 14px;
    display: block;
    margin-top: 8px;
    text-align: left;
`

export {
    InputText,
    Textarea,
    Errmsg
}