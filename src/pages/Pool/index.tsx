import React from 'react';

import PoolCard from 'component/PoolCard';
import styled from 'styled-components';
import { useStore } from 'store';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Pool() {
  const { pools } = useStore();

  return (
    <Container>
      {pools.map((pool) => <PoolCard key={pool.tokenAccountIds.toString()} pool={pool} />)}
    </Container>
  );
}
