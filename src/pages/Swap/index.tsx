import React, { useCallback, useState } from 'react';
import CurrencyInputPanel from 'component/CurrencyInputPanel';
import { ButtonTertiary } from 'component/Button';
import {
  Transaction, wallet,
} from 'services/near';
import { ReactComponent as PlaceholderToken } from 'assets/images/placeholder-logo.svg';
import { ReactComponent as PlaceholderSymbol } from 'assets/images/placeholder-symbol.svg';
import { ReactComponent as PlaceholderMinterTitle } from 'assets/images/placeholder-minter-title.svg';
import { ReactComponent as PlaceholderWallet } from 'assets/images/placeholder-wallet.svg';

import { formatAmount, getUpperCase } from 'utils/index';
import { IToken, useStore } from 'store';
import { BASE, trustedTokens } from 'utils/constants';

import getConfig from 'services/config';
import Big from 'big.js';
import { getSwappedAmount } from 'services/stable-swap';
import { sendTransactions } from 'services/wallet';
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
  Wallet,
} from './styles';

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
    openModal: (tokenType: TokenType) => void,
    token: IToken | null,
    tokenType: TokenType,
    value: string,
    setValue: any,
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
              {new Big(formatAmount(balance ?? 0, token?.metadata.decimals)).toFixed(3)}
            </WalletInformation>
            <InputContainer>
              <TokenWrapper onClick={() => openModal(tokenType)}>
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
                disabled={tokenType === TokenType.Output}
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
    pools,
  } = useStore();

  const [inputTokenValue, setInputTokenValue] = useState<string>('');
  const [outputTokenValue, setOutputTokenValue] = useState<string>('');

  const leftSide = `${inputTokenValue || 1} ${getUpperCase(inputToken?.metadata.symbol ?? '')}`;
  const rightSide = `${outputTokenValue || 1} ${getUpperCase(outputToken?.metadata.symbol ?? '')}`;

  const openModal = useCallback(
    (tokenType: TokenType) => {
      setSearchModalOpen({ isOpen: true, tokenType });
    },
    [],
  );

  const changeTokens = () => {
    const oldOutputToken = outputToken;
    setOutputToken(inputToken);
    setInputToken(oldOutputToken);
  };

  const isConnected = wallet.isSignedIn();
  const { setAccountModalOpen } = useStore();

  const title = isConnected
    ? 'Swap'
    : 'Connect wallet';

  const swap = () => {
    if (!inputToken || !outputToken) return;

    const config = getConfig();
    const transactions: Transaction[] = [];
    transactions.push({
      receiverId: config.contractId,
      functionCalls: [{
        methodName: 'swap',
        args: {
          actions: [{
            pool_id: 2,
            token_in: inputToken.contractId,
            amount_in: new Big(inputTokenValue)
              .mul(new Big(BASE).pow(inputToken.metadata.decimals)).toFixed(),
            token_out: outputToken.contractId,
            min_amount_out: '0',
          }],
          referral_id: 'solniechniy.testnet',
          amount: 1,
        },
      }],
    });
    sendTransactions(transactions, wallet);
  };

  const changeInputAmount = (value: string) => {
    if (!inputToken || !outputToken) return;

    const [amountSwapped] = getSwappedAmount(
      inputToken.contractId,
      outputToken.contractId,
      value,
      pools[2],
    );
    setInputTokenValue(value);
    setOutputTokenValue(
      new Big(amountSwapped)
        .div(new Big(BASE).pow(outputToken.metadata.decimals)).toFixed(),
    );
  };

  return (
    <Container>
      <ActionContainer>
        <Input
          openModal={openModal}
          token={inputToken}
          tokenType={TokenType.Input}
          value={inputTokenValue}
          setValue={changeInputAmount}
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
        {loading
          ? 'Loading...'
          : (
            <>
              <div>{leftSide}</div>
              <div>≈</div>
              <div>{rightSide}</div>
            </>
          ) }
      </Label>
      {isConnected
        ? <ButtonTertiary onClick={swap}>{title}</ButtonTertiary>
        : (
          <ButtonTertiary onClick={() => setAccountModalOpen(true)}>
            <Wallet />
            {title}
          </ButtonTertiary>
        )}
    </Container>
  );
}
