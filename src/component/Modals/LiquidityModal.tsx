import React, { useState } from 'react';
import styled from 'styled-components';

import logoInputToken from 'assets/images/outputTokenLogo.svg';

import { ReactComponent as CloseIcon } from 'assets/images/close.svg';
import { ReactComponent as Wallet } from 'assets/images/wallet.svg';
import { useStore } from 'store';
import { getUpperCase } from 'utils';
import CurrencyInputPanel from 'component/CurrencyInputPanel';
import { ButtonTertiary } from 'component/Button';
import {
  Modal, Layout, ModalBlock, ModalClose,
} from './styles';

const ModalTitle = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 120%;
  margin-block-start: 0;
  margin-block-end: 0;
  margin: 0 auto;
`;

const ModalBody = styled.div`
  margin: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &> button {
    border-radius: 2px;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
`;

const InputLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 1.625rem;
`;

const WalletInformation = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.75rem;
  align-items: flex-end;
  font-style: normal;
  font-weight: normal;
  font-size: 1.125rem;
  line-height: 1.063rem;
  align-items: center;
`;

const ButtonHalfWallet = styled.button`
  background-color: ${({ theme }) => theme.globalWhite};
  border: none;
  & > span {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: right;
    font-style: normal;
    font-weight: normal;
    font-size: 1.125rem;
    line-height: 1.125rem;
    color: ${({ theme }) => theme.globalLightGrey};
  }
`;

const ButtonMaxWallet = styled(ButtonHalfWallet)`
  margin-left: 0.625rem;
`;

const LogoWallet = styled(Wallet)`
  margin-right: 0.438rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${({ theme }) => theme.BgCardGrey};
  padding: 16px 24px 16px 24px;
  border-radius: 2px;
`;

const LogoContainer = styled.div`
  margin-right: 1rem;
`;

const TokenTitle = styled.div`
  flex: 1;
  font-style: normal;
  font-weight: normal;
  font-size: 2rem;
  line-height: 2rem;
  text-align: right;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TokensBlock = (
  { setSearchModalOpen }:any, // TODO: fix type
) => {
  const [value, setValue] = useState<string>('');

  const setHalfAmount = () => {
    console.log('HALF');
  };
  const setMaxAmount = () => {
    console.log('MAX');
  };

  return (
    <Block>
      <InputLabel>
        <WalletInformation>
          <LogoWallet />
          0.12341234
        </WalletInformation>
        <ButtonHalfWallet onClick={setHalfAmount}>
          <span>HALF</span>
        </ButtonHalfWallet>
        <ButtonMaxWallet onClick={setMaxAmount}>
          <span>MAX</span>
        </ButtonMaxWallet>
      </InputLabel>
      <InputContainer>
        <LogoContainer>
          {/* TODO: fix logo */}
          <img src={logoInputToken} alt="inputMinterLogo" />
        </LogoContainer>
        <TokenTitle onClick={() => setSearchModalOpen(true)}>
          {/* TODO: fix title */}
          {getUpperCase('LTC')}
        </TokenTitle>
        <CurrencyInputPanel
          value={value}
          setValue={setValue}
        />
      </InputContainer>
    </Block>
  );
};

export default function LiquidityModal() {
  const { setSearchModalOpen } = useStore();

  const { isLiquidityModalOpen, setLiquidityModalOpen } = useStore();
  return (
    <>
      {isLiquidityModalOpen && (
      <Layout onClick={() => setLiquidityModalOpen(false)}>
        <Modal onClick={(e:any) => e.stopPropagation()}>
          <ModalBlock>
            <ModalTitle>
              Add Liquidity
            </ModalTitle>
            <ModalClose onClick={() => setLiquidityModalOpen(false)}>
              <CloseIcon />
            </ModalClose>
          </ModalBlock>
          <ModalBody>
            <TokensBlock
              setSearchModalOpen={setSearchModalOpen}
            />
            <TokensBlock
              setSearchModalOpen={setSearchModalOpen}
            />
            <ButtonTertiary
              onClick={() => console.log('DEPOSIT')}
            >
              Add Liquidity
            </ButtonTertiary>
          </ModalBody>
        </Modal>
      </Layout>
      )}
    </>
  );
}
