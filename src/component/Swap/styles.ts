import styled from 'styled-components';
import { isMobile } from 'utils/userAgent';
import { ReactComponent as Wallet } from 'assets/images/wallet.svg';
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
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 27px 38px 30px 26px;
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

export const LogoWallet = styled(Wallet)`
  margin-right: 0.438rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LogoContainer = styled.div`
  margin-right: 1rem;
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

export const Input = styled.input`
  width: 60%;
  outline: none;
  border: none;
  background: none;
  font-style: normal;
  font-weight: normal;
  font-size: 2rem;
  line-height: 2rem;
  text-align: right;
`;

export const IntermediateBlock = styled.div``;

export const Label = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 1.125rem;
  line-height: 1.063rem;
  text-align: center;
  color: ${({ theme }) => theme.globalBLack};
`;
