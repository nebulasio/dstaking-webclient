import styled from 'styled-components';
import media from 'components/common/base/media';

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
        padding: 4px;
        font-size: 1rem;

        input {
            width: 70%;
            padding: 10px;
            border: none;
            border-bottom: 1px solid #ccc;

            &.nas-addr {
                font-size: 0.8rem;
            }

            ${media.tablet`
                width: 100%;
            `}
        }
    }

    label {
        font-size: 16px;
        font-weight: 600;
        margin-right: 5px;
    }

    a {
        font-size: 1rem;
        color: ${props => props.theme.primaryColor};
        &:hover {
            text-decoration: none;
            font-weight: 500;
            color: ${props => props.theme.primaryHoverColor};
        }
    }
`

export { Group, TextGroup };