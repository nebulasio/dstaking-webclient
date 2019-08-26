import React from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import media from 'components/common/base/media';

const Wrapper = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
`
const TabList = styled.div`
    display: flex;
    justify-content: center;
    & > a {
        font-size:18px;
        font-weight:400;
        color: #333;
        margin: 0 60px;
        padding: 24px 0;

        &.selected {
            color: ${(props) => props.theme.primaryColor};
            border-bottom: 2px solid ${(props) => props.theme.primaryColor};
        }

        &:hover {
            color: ${(props) => props.theme.primaryColor};
            text-decoration: none;
        }

        ${media.tablet`
            margin: 0 20px;
        `}
    }
`

export default function Tab() {
    const { t } = useTranslation("common");

    function isActiveOnlineTab(math, location) {
        return location.pathname === '/online/' || location.pathname === "/" ? true : false;
    }

    return (
        <Wrapper>
            <TabList>
                <NavLink to="/online/" isActive={isActiveOnlineTab} activeClassName="selected">{t('online staking')}</NavLink>
                <NavLink to="/offline/" activeClassName="selected">{t('offline staking')}</NavLink>
            </TabList>
        </Wrapper>
    )
}
