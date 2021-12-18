import React, {
  Dispatch, SetStateAction, useCallback, useState,
} from 'react';
import CurrencyInputPanel from 'component/CurrencyInputPanel';
import { ButtonTertiary } from 'component/Button';
import { wallet } from 'services/near';

import { formatAmount, getUpperCase } from 'utils/index';
import { information, IToken, useStore } from 'store';
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
  }:
  {
    openModal: () => void,
    token: IToken | null,
    tokenType: TokenType,
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    balance:string,
  },
) => {
  const trustedToken = trustedTokens[token?.contractId ?? ''];
  return (
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
  } = useStore();

  const [inputTokenValue, setInputTokenValue] = useState<string>('');
  const [outputTokenValue, setOutputTokenValue] = useState<string>('');

  const leftSide = `${inputTokenValue || 1} ${getUpperCase(information.inputTokenName)}`;
  const rightSide = `${outputTokenValue || 100} ${getUpperCase(information.outputTokenName)}`;

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
  const isConnected = wallet.isSignedIn();
  const { setAccountModalOpen } = useStore();

  const title = isConnected
    ? 'Swap'
    : 'Connect wallet';

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
        />
      </ActionContainer>
      <Label>
        <div>{leftSide}</div>
        <div>≈</div>
        <div>{rightSide}</div>
      </Label>
      {isConnected
        ? <ButtonTertiary>{title}</ButtonTertiary>
        : (
          <ButtonTertiary onClick={() => setAccountModalOpen(true)}>
            <Wallet />
            {title}
          </ButtonTertiary>
        )}
    </Container>
  );
}
