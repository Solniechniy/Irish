import React, { useEffect } from 'react';
import { ButtonTertiary } from 'component/Button';
import { useStore, IPool, ITokenMetadata } from 'store';
import { BASE } from 'utils/constants';
import { STABLE_LP_TOKEN_DECIMALS } from 'services/stable-swap';
import Big from 'big.js';
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
    tokens, setLiquidityModalOpen, updatePool,
  } = useStore();
  const [inputToken, outputToken] = pool.tokenAccountIds;
  const tokenInput = tokens[inputToken] ?? null;
  const tokenOutput = tokens[outputToken] ?? null;
  if (!tokenInput || !tokenOutput) return null;

  const tokensArray = [tokenInput, tokenOutput].map(((v) => v.metadata));

  useEffect(() => {
    updatePool(pool.id);
  }, []);

  const profit = [
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
      value: `$${new Big(pool.sharesTotalSupply ?? 0).div(new Big(BASE).pow(STABLE_LP_TOKEN_DECIMALS)).toFixed(2)}`,
    },
    {
      title: 'Shares',
      value: `${new Big(pool.poolShares ?? 0).div(new Big(BASE).pow(STABLE_LP_TOKEN_DECIMALS)).toFixed(2)} (0%)`,
    },
    {
      title: 'APY',
      value: '0.65%',
    },
  ];

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
              834.17K
            </TokenValue>
          </TokenContainer>
        ))}
      </TokenBock>
      {/* <CurrencyExchange>
        {currencyExchange}
      </CurrencyExchange> */}
      <ProfitBlock>
        {profit.map((el) => (
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
