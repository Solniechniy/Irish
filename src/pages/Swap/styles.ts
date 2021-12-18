import styled from 'styled-components';
import { isMobile } from 'utils/userAgent';
import { ReactComponent as WalletImage } from 'assets/images/wallet.svg';
import { ReactComponent as IconArrowDown } from 'assets/images/icon-arrow-down.svg';
import { ReactComponent as Exchange } from 'assets/images/exchange.svg';

export const Container = styled.div`
  display: flex;
  color: ${({ theme }) => theme.globalBLack};
  flex-direction: column;
`;

export const ActionContainer = styled.div`
  background: ${({ theme }) => theme.BgCardGrey};
  border-radius: ${isMobile ? '2px' : '8px'};
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px 38px 27px 26px;
  min-width: 721px;
  height: 325px;
`;

export const Block = styled.div`
  background: ${({ theme }) => theme.BgCardGrey};
  border-radius: ${isMobile ? '2px' : '8px'};
  display: flex;
  flex-direction: column;
  padding: 10px 0px 0px 0px;
`;

export const WalletInformation = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 27px;
  align-items: flex-end;
  font-style: normal;
  font-weight: normal;
  font-size: 1.125rem;
  line-height: 1.063rem;
  align-items: center;
`;

export const LogoWallet = styled(WalletImage)`
  margin-right: 0.438rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LogoContainer = styled.div`
  margin-right: 1rem;
  >img{
    height: 3rem;
    width: 3rem;
  }
`;

export const TokenContainer = styled.div`
  flex: 1;

`;

export const TokenTitle = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 2rem;
  line-height: 2rem;
  text-align: right;
  display: flex;
  align-items: center;
`;

export const ArrowDown = styled(IconArrowDown)`
  margin-left: 0.875rem;
`;

export const MinterLogo = styled.div`
  margin-right: 4px;
  &>img{
    max-height: 1.5rem;
    max-width: 1.5rem;
  }
`;

export const MinterName = styled.div`
  margin-top: .75rem;
  font-style: normal;
  font-weight: normal;
  font-size: .75rem;
  line-height: .75rem;
  display: flex;
  align-items: center;
`;

export const ExchangeContainer = styled.div`
  align-self: center;
  position: relative;
  :after {
    content: '';
    position: absolute;
    border: 2px solid ${({ theme }) => theme.exchangeBorder};
    width: 264px;
    top: 50%;
    transform: translateY(-50%);
    left: 40px;
  }
  :before {
    content: '';
    position: absolute;
    border: 2px solid ${({ theme }) => theme.exchangeBorder};
    width: 264px;
    top: 50%;
    transform: translateY(-50%);
    right: 40px;
  }
`;

export const ExchangeLogo = styled(Exchange)`
  cursor: pointer;
`;

export const Label = styled.div`
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 1.125rem;
  line-height: 1.063rem;
  text-align: center;
  color: ${({ theme }) => theme.globalBLack};
  margin: 24px 0;
  white-space: nowrap;
  & > div:first-child {
    flex: 1 1 0;
    display: flex;
    justify-content: flex-end;
    overflow: hidden;
  }
  & > div:nth-child(2) { 
    flex: 0 1 0;
    padding: 0 10px;
  }

  & > div:last-child { 
    flex: 1 1 0;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
  }
`;

export const TokenWrapper = styled.div`
  display:flex;
  flex-direction: row;
  cursor: pointer;
`;

export const Wallet = styled(LogoWallet)`
  margin-right: 0.625rem;
  path {
    fill: ${({ theme }) => theme.globalWhite};
  }
`;
