import styled from 'styled-components';

const Group = styled.div`
    margin: ${props => props.margin ? props.margin : "40px auto"} ;
    text-align: center;
`

const TextGroup = styled.div`
    padding: ${props => props.margin ? props.margin : "20px"} ;
    margin: ${props => props.margin ? props.margin : "20px auto"} ;
    background-color: ${props => props.theme.resultBackgroundColor};

    p {
        margin: 0;
        padding: 0;
        font-size: 14px;

        input {
            width: 70%;
            padding: 10px;
            border: none;
            border-bottom: 1px solid #ccc;
        }
    }

    label {
        font-size: 16px;
        font-weight: 600;
        margin-right: 5px;
    }

    a {
        color: ${props => props.theme.primaryColor};
        &:hover {
            text-decoration: none;
            font-weight: 500;
            color: ${props => props.theme.primaryHoverColor};
        }
    }
`

export { Group, TextGroup };