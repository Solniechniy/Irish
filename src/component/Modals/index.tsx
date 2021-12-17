import React from 'react';
import AccountModal from './AccountModal';
import LiquidityModal from './LiquidityModal';

export default function Modals({ children }: {children: JSX.Element}) {
  return (
    <>
      <AccountModal />
      <LiquidityModal />
      {children}
    </>
  );
}
