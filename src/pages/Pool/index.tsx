import React from 'react';
import teatherLogo from 'assets/images/teather.svg';
import usdcLogo from 'assets/images/USDC.svg';
import PoolCard from 'component/PoolCard';
import styled from 'styled-components';
import { useStore } from 'store';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

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
  const { pools } = useStore();

  return (
    <Container>
      {pools.map((pool) => <PoolCard key={pool.tokenAccountIds.toString()} pool={pool} />)}
    </Container>
  );
}
