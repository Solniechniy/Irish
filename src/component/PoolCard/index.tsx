import React, { useEffect } from 'react';
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

export default function PoolCard({ pool }: {pool:IPool}) {
  const {
    tokens, setLiquidityModalOpen, setSearchModalOpen, updatePool,
  } = useStore();
  const [inputToken, outputToken] = pool.tokenAccountIds;
  const tokenInput = tokens[inputToken] ?? null;
  const tokenOutput = tokens[outputToken] ?? null;
  if (!tokenInput || !tokenOutput) return null;

  const tokensArray = [tokenInput, tokenOutput].map(((v) => v.metadata));
  const onClick = () => setSearchModalOpen(true);
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        updatePool(pool.id);
      } catch (e) {
        console.warn(e);
      }
    }, 1500);
    return () => clearTimeout(timer);
  });

  const profitArr = [
    {
      title: 'Fee',
      value: `${pool.poolFee ?? 0}%`,
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
      value: `$${pool.sharesTotalSupply ?? 0}`,
    },
    {
      title: 'Shares',
      value: `${pool.poolShares ?? 0} (0%)`,
    },
    {
      title: 'APY',
      value: '0.65%',
    },
  ];

  const currencyExchange = '1 USDT ≈ 0.9992999 USDC';

  return (
    <CardBlock>
      <TokenBock>
        {tokensArray.map((token: ITokenMetadata) => (
          <TokenContainer key={token.symbol}>
            <TokenLogo onClick={onClick}>
              <img src={token.icon} alt={token.name} />
            </TokenLogo>
            <TokenTitle onClick={onClick}>
              {token.symbol}
            </TokenTitle>
            <TokenLabel onClick={onClick}>
              {token.name}
            </TokenLabel>
            <TokenValue>
              0.0
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
