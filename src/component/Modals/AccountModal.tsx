import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'store';
import { ReactComponent as CloseIcon } from 'assets/images/close.svg';
import { ReactComponent as NearLogo } from 'assets/images/near.svg';
import { ReactComponent as RightArrow } from 'assets/images/right-arrow.svg';
import { ButtonTertiary } from 'component/Button';
import { formatAmount } from 'utils';
import { wallet as nearWallet } from 'services/near';
import { utils } from 'near-api-js';
import getConfig from 'services/config';
import {
  Modal, Layout, ModalBlock, ModalTitle, ModalClose,
} from './styles';

const WalletRow = styled.div`
  cursor: pointer;
  background-color: ${({ theme }) => theme.BgCardGrey};
  border-radius: 4px;
  display:flex;
  flex-direction: row;
  padding: 12px 13px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const WalletTitle = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 140.38%;
  &> svg {
    margin-right: 16px;
  }
`;

const BalanceSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const BalanceTitle = styled.h6`
  font-style: normal;
  font-weight: normal;
  font-size: .75rem;
  line-height: 140.38%;
  margin-block-start: 8px;
  margin-block-end: 8px;
`;

const BalanceAmount = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 140.38%;
  margin-block-start: 8px;
  margin-block-end: 8px;
`;

const ModalFooter = styled.div`
  margin: 24px;
  & > button {
    width: 100%;
  }
`;

export default function AccountModal() {
  const {
    isAccountModalOpen, setAccountModalOpen, wallet, setWallet,
  } = useStore();

  const [balance, setBalance] = useState<string|null>(null);
  const headerTitle = wallet ? 'Your account' : 'Connect to a wallet';
  const config = getConfig();
  useEffect(() => {
    const isConnected = wallet?.isSignedIn() ?? false;
    if (isConnected && wallet) {
      wallet.account().getAccountBalance()
        .then((balances) => setBalance(utils.format.formatNearAmount(balances.available)));
    }
  }, [wallet]);

  return (
    <>
      {isAccountModalOpen && (
      <Layout onClick={() => setAccountModalOpen(false)}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <ModalBlock>
            <ModalTitle>
              {headerTitle}
            </ModalTitle>
            <ModalClose onClick={() => setAccountModalOpen(false)}>
              <CloseIcon />
            </ModalClose>
          </ModalBlock>
          <ModalBlock>
            <WalletRow
              onClick={() => (wallet ? null : nearWallet.requestSignIn(config.contractId))}
            >
              <WalletTitle>
                <NearLogo />
                {wallet ? wallet.account().accountId : 'Near'}
              </WalletTitle>
              {!wallet && <RightArrow />}
            </WalletRow>
          </ModalBlock>
          <ModalBlock>
            {wallet
              && (
                <BalanceSection>
                  <BalanceTitle>Balance</BalanceTitle>
                  <BalanceAmount>
                    {formatAmount(balance ?? '0')}
                    {' '}
                    NEAR
                  </BalanceAmount>
                </BalanceSection>
              )}
          </ModalBlock>
          {wallet && (
          <ModalFooter>
            <ButtonTertiary onClick={() => {
              nearWallet.signOut();
              setWallet(null);
            }}
            >
              Disconnect
            </ButtonTertiary>
          </ModalFooter>
          )}
        </Modal>
      </Layout>
      )}
    </>
  );
}
