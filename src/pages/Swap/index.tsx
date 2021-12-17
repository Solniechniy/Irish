import React, {
  Dispatch, SetStateAction, useCallback, useState,
} from 'react';
import CurrencyInputPanel from 'component/CurrencyInputPanel';

import { formatAmount, getUpperCase } from 'utils/index';
import { information, IToken, useStore } from 'store';
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
  console.log(balance, token?.metadata.decimals);
  return (
    <Block>
      <WalletInformation>
        <LogoWallet />
        {formatAmount(balance ?? 0, token?.metadata.decimals)}
      </WalletInformation>
      <InputContainer>
        <TokenWrapper onClick={openModal}>
          <LogoContainer>
            <img src={token?.metadata?.icon ?? ''} alt="inputMinterLogo" />
          </LogoContainer>
          <TokenContainer>
            <TokenTitle>
              {getUpperCase(token?.metadata.symbol ?? '')}
              <ArrowDown />
            </TokenTitle>
            {/* <MinterName>
              <MinterLogo>
                <img src={information.inputMinterLogo} alt="inputMinterLogo" />
              </MinterLogo>
              {information.inputMinterName}
            </MinterName> */}
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
    setSearchModalOpen, inputToken, outputToken, balances,
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
          <ExchangeLogo />
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
      <SwapButton />
    </Container>
  );
}
