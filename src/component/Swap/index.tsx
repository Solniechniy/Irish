import React from 'react';
import { getUpperCase } from 'utils/index';
import { information } from 'store';

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
  Input,
  LogoWallet,
  IntermediateBlock,
  Label,
} from './styles';
import SwapButton from './SwapButton';

export default function Swap() {
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
              <TokenTitle>
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
            <Input
              placeholder="0.0"
              type="number"
            />
          </InputContainer>
        </Block>
        {isMobile
          ? null
          : (
            <IntermediateBlock />
          )}
      </ActionContainer>
      <Label>
        1 ETH ≈ 4923.333 NEAR
      </Label>
      <SwapButton />
    </Container>
  );
}
