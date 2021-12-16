import React from 'react';
import { wallet as nearWallet } from 'services/near';
import styled from 'styled-components';
import { colors } from 'theme';
import { isMobile } from 'utils/userAgent';
import { trimAccountId } from 'utils';
import { useStore } from 'store/store';
import { ButtonPrimary, ButtonSecondary } from 'component/Button';
import { ReactComponent as LogoWallet } from 'assets/images/wallet.svg';

const Wallet = styled(LogoWallet)`
  margin-right: 0.625rem;
  fill: ${({ theme }) => theme.globalBlack};
`;

export default function ConnectionButton() {
  const {
    isConnected, accountId, setWallet, setIsConnected,
  } = useStore();
  const unauthorizedTitle = isMobile ? 'Wallet' : 'Connect wallet';

  const title = isConnected
    ? trimAccountId(isMobile, accountId)
    : unauthorizedTitle;

  if (isConnected) {
    return (
      <ButtonSecondary onClick={() => {
        nearWallet.signOut();
        setWallet(null);
        setIsConnected(nearWallet.isSignedIn());
      }}
      >
        {title}
      </ButtonSecondary>
    );
  }
  return (
    <ButtonPrimary onClick={() => {
      nearWallet.requestSignIn();
    }}
    >
      <Wallet fill={colors.globalBlack} />
      {title}
    </ButtonPrimary>
  );
}
