import React from 'react';
import { wallet } from 'services/near';
import styled from 'styled-components';
import { isMobile } from 'utils/userAgent';
import { trimAccountId } from 'utils';

import { useStore } from 'store';
import { ButtonPrimary, ButtonSecondary } from 'component/Button';
import { ReactComponent as LogoWallet } from 'assets/images/wallet.svg';
import { ReactComponent as LogoNear } from 'assets/images/near.svg';
import { ReactComponent as ArrowDown } from 'assets/images/arrow-down.svg';

const Wallet = styled(LogoWallet)`
  margin-right: 0.625rem;
`;
const Near = styled(LogoNear)`
  margin-right: 0.5rem;
`;
const Arrow = styled(ArrowDown)`
  margin-left: 0.938rem;
`;

export default function ConnectionButton() {
  const isConnected = wallet.isSignedIn();
  const accountId = wallet.getAccountId();
  const { setAccountModalOpen } = useStore();

  const title = isConnected
    ? trimAccountId(isMobile, accountId)
    : 'Connect wallet';

  if (isConnected) {
    return (
      <ButtonSecondary onClick={() => setAccountModalOpen(true)}>
        <Near />
        {title}
        <Arrow />
      </ButtonSecondary>
    );
  }
  return (
    <>
      {isMobile
        ? (
          <Wallet onClick={() => setAccountModalOpen(true)} />
        )
        : (
          <ButtonPrimary onClick={() => setAccountModalOpen(true)}>
            <Wallet />
            {title}
          </ButtonPrimary>
        ) }
    </>
  );
}
