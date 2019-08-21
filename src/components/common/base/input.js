import styled from 'styled-components';

const InputText = styled.input`
    height: ${(props) => props.theme.inputHeight};
    border:  1px solid ${(props) => props.theme.borderColor};
    padding: 14px 18px;
    font-size:14px;

    &:focus {
        box-shadow: none;
    }

    &::placeholder {
        color: #999999;
    }
`

const InputTextBlock = styled(InputText)`
    width: 100%;
    display: block;
`

const Textarea = styled.textarea`
    border:  1px solid ${(props) => props.theme.borderColor};
    padding: 14px 18px;
    font-size:14px;
    width: 100%;

    &:focus {
        box-shadow: none;
    }

    &::placeholder {
        color: #999999;
    }

`

export {
    InputText,
    InputTextBlock,
    Textarea
}