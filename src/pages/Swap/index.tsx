import React, { useState } from 'react';
import CurrencyInputPanel from 'component/CurrencyInputPanel';

import { getUpperCase } from 'utils/index';
import { information, useStore } from 'store';
import { isMobile } from 'utils/userAgent';
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
} from './styles';
import SwapButton from './SwapButton';

export default function Swap() {
  const { setSearchModalOpen } = useStore();
  const [inputTokenValue, setInputTokenValue] = useState<string>('');
  const [outputTokenValue, setOutputTokenValue] = useState<string>('');

  const leftSide = `${inputTokenValue || 1} ${getUpperCase(information.inputTokenName)}`;
  const rightSide = `${outputTokenValue || 100} ${getUpperCase(information.outputTokenName)}`;
  return (
    <Container>
      <ActionContainer>
        <Block>
          <WalletInformation>
            <LogoWallet />
            {information.inputTokenBalance}
          </WalletInformation>
          <InputContainer>
            <LogoContainer>
              <img src={information.inputTokenLogo} alt="inputMinterLogo" />
            </LogoContainer>
            <TokenContainer>
              <TokenTitle onClick={() => setSearchModalOpen(true)}>
                {getUpperCase(information.inputTokenName)}
                <ArrowDown />
              </TokenTitle>
              <MinterName>
                <MinterLogo>
                  <img src={information.inputMinterLogo} alt="inputMinterLogo" />
                </MinterLogo>
                {information.inputMinterName}
              </MinterName>
            </TokenContainer>
            <CurrencyInputPanel
              value={inputTokenValue}
              setValue={setInputTokenValue}
            />
          </InputContainer>
        </Block>
        {isMobile
          ? null
          : (
            <ExchangeContainer>
              <ExchangeLogo />
            </ExchangeContainer>
          )}
        <Block>
          <WalletInformation>
            <LogoWallet />
            {information.outputTokenBalance}
          </WalletInformation>
          <InputContainer>
            <LogoContainer>
              <img src={information.outputTokenLogo} alt="inputMinterLogo" />
            </LogoContainer>
            <TokenContainer>
              <TokenTitle>
                {getUpperCase(information.outputTokenName)}
                <ArrowDown />
              </TokenTitle>
              <MinterName>
                <MinterLogo>
                  <img src={information.outputMinterLogo} alt="inputMinterLogo" />
                </MinterLogo>
                {information.outputMinterName}
              </MinterName>
            </TokenContainer>
            <CurrencyInputPanel
              value={outputTokenValue}
              setValue={setOutputTokenValue}
            />
          </InputContainer>
        </Block>
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
