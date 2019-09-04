import React from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import media from 'components/common/base/media';
import { IoIosHelpCircleOutline } from 'react-icons/io'
import ReactTooltip from 'react-tooltip'
import 'styles/theme.scss'

const Wrapper = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    position: relative;
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

const StakingNote = styled.div`
    position: absolute;
    right: 15px;
    top: 28px;

    &:hover {
        cursor: pointer;
    }

    svg {
        color: #9C9DB2;
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
            <StakingNote data-tip data-for='staking-note'  ><IoIosHelpCircleOutline size="18px" /></StakingNote>
            <ReactTooltip id='staking-note' place="bottom" effect="solid" >
                <div dangerouslySetInnerHTML={{ __html: t("staking-note") }} />
            </ReactTooltip>
        </Wrapper>
    )
}
