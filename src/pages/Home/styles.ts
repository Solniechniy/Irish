import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ReactComponent as Wallet } from 'assets/images/wallet.svg';
import { isMobile } from 'utils/userAgent';

interface ICurrentTab {
  isActive?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  color: ${({ theme }) => theme.globalBlack};
  padding: 1.5rem 4.375rem 2.563rem 4.375rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1.5rem 3rem 2.563rem 3rem;
  `}
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 1.5rem 1.25rem 2.563rem 1.25rem;
  `}
`;

export const LeftContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  & > svg {
    margin-right: 0.438rem;
  }
`;
export const RightContainer = styled.div`
  display: flex;
  flex: 1 1 0;
  justify-content: flex-end;
`;

export const LogoTitle = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 2rem;
  line-height: 2.438rem;
  color: ${({ theme }) => theme.globalBlack};
`;

export const NavBar = styled.div`
  flex: 0 1 0;
  display: flex;
  color: white;
`;

export const NavButton = styled.div<PropsWithChildren<ICurrentTab>>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1.438rem;
  color: ${({ theme, isActive }) => {
    if (isMobile) {
      return (isActive ? theme.orange : theme.globalGrey);
    }
    return (isActive ? theme.globalBlack : theme.globalLightGrey);
  }
};
  margin: 0 12px;
  position: relative;
  :hover {
    cursor: pointer;
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 1rem;
    line-height: 1.188rem;
    margin: 0 8px;
  `}
`;

export const WalletIcon = styled(Wallet)`
  margin-right: 0.625rem;
`;

export const Body = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
