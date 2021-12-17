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

export const getUpperCase = (value:string) => value.toUpperCase();

export const inputRegex = RegExp('^\\d*(?:\\\\[.])?\\d*$'); // match escaped "." characters via in a non-capturing group

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function toCameCase(str:string) {
  return str.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase());
}
