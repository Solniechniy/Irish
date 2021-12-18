import React, { Dispatch, SetStateAction, useState } from 'react';
import Big from 'big.js';
import styled from 'styled-components';
import CurrencyInputPanel from 'component/CurrencyInputPanel';

import { ReactComponent as CloseIcon } from 'assets/images/close.svg';
import { ReactComponent as Wallet } from 'assets/images/wallet.svg';
import { IToken, useStore } from 'store';
import { formatAmount, getUpperCase } from 'utils';
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
  & > img {
    width: 3rem;
    height: 3rem;
  }
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
`;
export enum TokenType { 'Input', 'Output'}

const TokensBlock = (
  {
    token,
    tokenType,
    value,
    setValue,
    balance,
    loading,
    maxAmount,
  }:
  {
    token: IToken | null,
    tokenType: TokenType,
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    balance:string,
    loading: boolean,
    maxAmount: Big
  },
) => {
  const setHalfAmount = () => {
    if (!balance) return;
    const newBalance = maxAmount.div(2);
    setValue(formatAmount(newBalance.toString(), token?.metadata.decimals));
  };

  const setMaxAmount = () => {
    if (!balance) return;
    const newBalance = formatAmount(maxAmount.toFixed() ?? 0, token?.metadata.decimals);
    setValue(newBalance);
  };

  return (
    <Block>
      <InputLabel>
        <WalletInformation>
          <LogoWallet />
          {new Big(formatAmount(balance ?? 0, token?.metadata.decimals)).toFixed(3)}
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
          <img src={token?.metadata?.icon ?? ''} alt={token?.metadata.symbol} />
        </LogoContainer>
        <TokenTitle>
          {getUpperCase(token?.metadata.symbol ?? '')}
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
  const {
    isLiquidityModalOpen,
    setLiquidityModalOpen,
    inputToken,
    setInputToken,
    outputToken,
    setOutputToken,
    balances,
    loading,
  } = useStore();

  const [inputTokenValue, setInputTokenValue] = useState<string>('');

  const firstBalance = new Big(balances[inputToken?.contractId ?? ''] ?? '1');
  const secondBalance = new Big(balances[outputToken?.contractId ?? ''] ?? '1');

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
              token={inputToken}
              tokenType={TokenType.Input}
              value={inputTokenValue}
              setValue={setInputTokenValue}
              balance={balances[inputToken?.contractId ?? '']}
              loading={loading}
              maxAmount={firstBalance.lt(secondBalance) ? firstBalance : secondBalance}
            />
            <TokensBlock
              token={outputToken}
              tokenType={TokenType.Output}
              value={inputTokenValue}
              setValue={setInputTokenValue}
              balance={balances[outputToken?.contractId ?? '']}
              loading={loading}
              maxAmount={firstBalance.lt(secondBalance) ? firstBalance : secondBalance}
            />
            <ButtonTertiary
              onClick={() => console.log('Add Liquidity')}
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
