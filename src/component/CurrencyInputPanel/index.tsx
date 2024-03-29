import React from 'react';
import styled from 'styled-components';
import { escapeRegExp, inputRegex } from 'utils/index';

interface IInputPanel {
  value: string;
  setValue: any;
  disabled?: boolean;
}

export const Input = styled.input`
  width: 60%;
  outline: none;
  border: none;
  background: none;
  font-style: normal;
  font-weight: normal;
  font-size: 2rem;
  line-height: 2rem;
  text-align: right;
`;

export default function CurrencyInputPanel({ value, setValue, disabled = false }:IInputPanel) {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      setValue(nextUserInput);
    }
  };
  return (
    <Input
      value={value}
      onChange={(event) => enforcer(event.target.value.replace(/,/g, '.'))}
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder="0.0"
      minLength={1}
      maxLength={79}
      disabled={disabled}
      spellCheck="false"
    />
  );
}
