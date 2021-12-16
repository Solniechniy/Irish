import React from 'react';
import { getUpperCase } from 'utils';
import { information } from 'store';
import teatherLogo from 'assets/images/teather.svg';
import usdcLogo from 'assets/images/USDC.svg';
import {
  Container,
  Block,
  TokenInformation,
  TokenContainer,
  TokenLogo,
  TokenTitle,
  TokenLabel,
  TokenValue,
  Label,
} from './styles';

const tokens = [
  {
    title: 'USDT',
    label: 'Teather',
    value: '834.17K',
    img: teatherLogo,
  },
  {
    title: 'USDC',
    label: 'USD Coin',
    value: '4.01M',
    img: usdcLogo,
  },
];

export default function Pool() {
  const label = '1 USDT ≈ 0.9992999 USDC';

  return (
    <Container>
      <Block>
        <TokenInformation>
          {tokens.map((el) => (
            <TokenContainer key={el.title}>
              <TokenLogo>
                <img src={el.img} alt={el.title} />
              </TokenLogo>
              <TokenTitle>
                {el.title}
              </TokenTitle>
              <TokenLabel>
                {el.label}
              </TokenLabel>
              <TokenValue>
                {el.value}
              </TokenValue>
            </TokenContainer>
          ))}
        </TokenInformation>
        <Label>
          {label}
        </Label>
      </Block>
    </Container>
  );
}
