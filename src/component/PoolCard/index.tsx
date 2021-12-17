import React from 'react';
import { ButtonTertiary } from 'component/Button';
import { useStore, IPool, ITokenMetadata } from 'store';
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

export default function PoolCard({ pool }: {pool:IPool}) {
  const currencyExchange = '1 USDT ≈ 0.9992999 USDC';
  const { tokens } = useStore();

  const [inputToken, outputToken] = pool.tokenAccountIds;
  const tokenInput = tokens[inputToken] ?? null;
  const tokenOutput = tokens[outputToken] ?? null;
  if (!tokenInput || !tokenOutput) return null;
  const { setLiquidityModalOpen } = useStore();

  const tokensArray = [tokenInput, tokenOutput].map(((v) => v.metadata));
  return (
    <CardBlock>
      <TokenBock>
        {tokensArray.map((token: ITokenMetadata) => (
          <TokenContainer key={token.symbol}>
            <TokenLogo>
              <img src={token.icon} alt={token.name} />
            </TokenLogo>
            <TokenTitle>
              {token.symbol}
            </TokenTitle>
            <TokenLabel>
              {token.name}
            </TokenLabel>
            <TokenValue>
              {0}
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
      <ButtonTertiary onClick={() => setLiquidityModalOpen(true)}>
        Deposit
      </ButtonTertiary>
    </CardBlock>
  );
}
