import React from 'react';
import { wallet } from 'services/near';
import styled from 'styled-components';
import { ButtonTertiary } from 'component/Button';
import { useStore } from 'store';
import { ReactComponent as LogoWallet } from 'assets/images/wallet.svg';

const Wallet = styled(LogoWallet)`
  margin-right: 0.625rem;
  path {
    fill: ${({ theme }) => theme.globalWhite};
  }
`;

export default function SwapButton() {
  const isConnected = wallet.isSignedIn();
  const { setAccountModalOpen } = useStore();

  const title = isConnected
    ? 'Swap'
    : 'Connect wallet';

  return (
    <>
      {isConnected
        ? <ButtonTertiary>{title}</ButtonTertiary>
        : (
          <ButtonTertiary onClick={() => setAccountModalOpen(true)}>
            <Wallet />
            {title}
          </ButtonTertiary>
        )}
    </>
  );
}
