import Big from 'big.js';

const BASE = 10;
const ACCOUNT_TRIM_LENGTH = 8;

export const formatAmount = (amount: string, decimals?: number):string => (
  new Big(amount).div(new Big(BASE).pow(decimals ?? 0)).toFixed()
);

export const trimAccountId = (isMobile: boolean, accountId: string) => (isMobile
  ? `${accountId.slice(0, ACCOUNT_TRIM_LENGTH)}...` : accountId
);

export const formatBalance = (value:string):string => {
  if (!value || value === '0') return '0';
  const formattedValue = new Big(value);

  if (formattedValue.lte('0.00001')) return '>0.00001';
  return formattedValue.toFixed(5);
};
