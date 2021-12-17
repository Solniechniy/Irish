import React from 'react';
import { ButtonTertiary } from 'component/Button';
import {
  CardBlock,
  TokenBock,
  TokenContainer,
  TokenLogo,
  TokenTitle,
  TokenLabel,
  TokenValue,
  CurrencyExchange,
  ProfitBlock,
  ProfitRow,
  ProfitLabel,
  ProfitValue,
} from './styles';

const profitArr = [
  {
    title: 'Fee',
    value: '0.4%',
  },
  {
    title: 'TVL',
    value: '$15.79M',
  },
  {
    title: '24h Volume',
    value: '212.76K',
  },
  {
    title: 'Total Shares',
    value: '75.23K',
  },
  {
    title: 'Shares',
    value: '0 (0%)',
  },
  {
    title: 'APY',
    value: '0.65%',
  },
];

export default function PoolCard({ tokens }:any) {
  const currencyExchange = '1 USDT ≈ 0.9992999 USDC';

  return (
    <CardBlock>
      <TokenBock>
        {tokens.map((el:any) => (
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
      </TokenBock>
      <CurrencyExchange>
        {currencyExchange}
      </CurrencyExchange>
      <ProfitBlock>
        {profitArr.map((el) => (
          <ProfitRow key={el.title}>
            <ProfitLabel>{el.title}</ProfitLabel>
            <ProfitValue>{el.value}</ProfitValue>
          </ProfitRow>
        ))}
      </ProfitBlock>
      <ButtonTertiary>
        Deposit
      </ButtonTertiary>
    </CardBlock>
  );
}
