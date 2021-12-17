import React, {
  Dispatch, SetStateAction, useCallback, useState,
} from 'react';
import CurrencyInputPanel from 'component/CurrencyInputPanel';
import { ReactComponent as PlaceholderToken } from 'assets/images/placeholder-logo.svg';
import { ReactComponent as PlaceholderSymbol } from 'assets/images/placeholder-symbol.svg';
import { ReactComponent as PlaceholderMinterTitle } from 'assets/images/placeholder-minter-title.svg';
import { ReactComponent as PlaceholderWallet } from 'assets/images/placeholder-wallet.svg';

import { formatAmount, getUpperCase } from 'utils/index';
import { IToken, useStore } from 'store';
import { trustedTokens } from 'utils/constants';
import {
  Container,
  ActionContainer,
  Block,
  InputContainer,
  LogoContainer,
  TokenContainer,
  TokenTitle,
  ArrowDown,
  MinterName,
  MinterLogo,
  WalletInformation,
  LogoWallet,
  ExchangeContainer,
  ExchangeLogo,
  Label,
  TokenWrapper,
} from './styles';
import SwapButton from './SwapButton';

export enum TokenType { 'Input', 'Output'}

const Input = (
  {
    openModal,
    token,
    tokenType,
    value,
    setValue,
    balance,
    loading,
  }:
  {
    openModal: () => void,
    token: IToken | null,
    tokenType: TokenType,
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    balance:string,
    loading: boolean,
  },
) => {
  const trustedToken = trustedTokens[token?.contractId ?? ''];
  return (
    <>
      {loading
        ? (
          <Block>
            <WalletInformation>
              <LogoWallet />
              <PlaceholderWallet />
            </WalletInformation>
            <InputContainer>
              <TokenWrapper>
                <LogoContainer>
                  <PlaceholderToken />
                </LogoContainer>
                <TokenContainer>
                  <TokenTitle>
                    <PlaceholderSymbol />
                    <ArrowDown />
                  </TokenTitle>
                  <MinterName>
                    <PlaceholderMinterTitle />
                  </MinterName>
                </TokenContainer>
              </TokenWrapper>
              <CurrencyInputPanel
                value={value}
                setValue={setValue}
              />
            </InputContainer>
          </Block>
        )
        : (
          <Block>
            <WalletInformation>
              <LogoWallet />
              {formatAmount(balance ?? 0, token?.metadata.decimals)}
            </WalletInformation>
            <InputContainer>
              <TokenWrapper onClick={openModal}>
                <LogoContainer>
                  <img src={token?.metadata?.icon ?? ''} alt={token?.metadata.symbol} />
                </LogoContainer>
                <TokenContainer>
                  <TokenTitle>
                    {getUpperCase(token?.metadata.symbol ?? '')}
                    <ArrowDown />
                  </TokenTitle>
                  {trustedToken && (
                  <MinterName>
                    <MinterLogo>
                      <img src={trustedToken.logo} alt={trustedToken.title} />
                    </MinterLogo>
                    {trustedToken.title}
                  </MinterName>
                  )}
                </TokenContainer>
              </TokenWrapper>
              <CurrencyInputPanel
                value={value}
                setValue={setValue}
              />
            </InputContainer>
          </Block>
        ) }

    </>
  );
};

export default function Swap() {
  const {
    setSearchModalOpen,
    inputToken,
    setInputToken,
    outputToken,
    setOutputToken,
    balances,
    loading,
  } = useStore();

  const [inputTokenValue, setInputTokenValue] = useState<string>('');
  const [outputTokenValue, setOutputTokenValue] = useState<string>('');

  const leftSide = `${inputTokenValue || 1} ${getUpperCase(inputToken?.metadata.symbol ?? '')}`;
  const rightSide = `${outputTokenValue || 1} ${getUpperCase(outputToken?.metadata.symbol ?? '')}`;

  const openModal = useCallback(
    () => {
      setSearchModalOpen(true);
    },
    [],
  );
  const changeTokens = () => {
    const oldOutputToken = outputToken;
    setOutputToken(inputToken);
    setInputToken(oldOutputToken);
  };

  return (
    <Container>
      <ActionContainer>
        <Input
          openModal={openModal}
          token={inputToken}
          tokenType={TokenType.Input}
          value={inputTokenValue}
          setValue={setInputTokenValue}
          balance={balances[inputToken?.contractId ?? '']}
          loading={loading}
        />
        <ExchangeContainer>
          <ExchangeLogo onClick={changeTokens} />
        </ExchangeContainer>
        <Input
          openModal={openModal}
          token={outputToken}
          tokenType={TokenType.Output}
          value={outputTokenValue}
          setValue={setOutputTokenValue}
          balance={balances[outputToken?.contractId ?? '']}
          loading={loading}
        />
      </ActionContainer>
      <Label>
        <div>{leftSide}</div>
        <div>≈</div>
        <div>{rightSide}</div>
      </Label>
      <SwapButton />
    </Container>
  );
}
