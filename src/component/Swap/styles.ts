import styled from 'styled-components';
// import { ReactComponent as Wallet } from 'assets/images/wallet.svg';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundCard};
  max-width: 500px;
  min-width: 328px;
  height: 400px;
  display: flex;

  align-self: flex-start;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.white};
  box-shadow: 0px 48px 108px -18px ${({ theme }) => theme.boxShadowCard};
  border-radius: 36px;
  /* border  need fix */
`;

export const Div = styled.div`
`;
