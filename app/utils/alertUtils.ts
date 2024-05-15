import { FocusEvent } from "react";

type NumberType = 'float' | 'int';
type CheckNumberProps = { event: FocusEvent<HTMLInputElement>, type: NumberType, vCurrent: number, label: string };

const parseNumber = (value: string, type: NumberType) => {
  if (type == 'float') {
    return parseFloat(value);
  } else if (type == 'int') {
    return parseInt(value);
  } else {
    console.error(`Undefined type ${type} is specified for alertUtils.parseNumber`);
    return 0;
  }
};

export const checkNumber = ({ event, type, vCurrent, label }: CheckNumberProps) => {
  const v: number = parseNumber(event.currentTarget.value, type);
  if (Number.isNaN(v)) {
    console.log('[' + label + '] Input a number!');
  } else {
    return v;
  }
  event.currentTarget.value = vCurrent.toString();
  return vCurrent;
};

export const checkPositiveNumber = ({ event, type, vCurrent, label }: CheckNumberProps) => {
  const v: number = parseNumber(event.currentTarget.value, type);
  if (checkNumber({ event, type, vCurrent, label }) != vCurrent) {
    if (v <= 0) {
      console.log('[' + label + '] Input a positive number!');
    } else {
      return v;
    }
  }
  event.currentTarget.value = vCurrent.toString();
  return vCurrent;
};

export const checkNonnegativeNumber = ({ event, type, vCurrent, label }: CheckNumberProps) => {
  const v: number = parseNumber(event.currentTarget.value, type);
  if (checkNumber({ event, type, vCurrent, label }) != vCurrent) {
    if (v < 0) {
      console.log('[' + label + '] Input a nonnegative number!');
    } else {
      return v;
    }
  }
  event.currentTarget.value = vCurrent.toString();
  return vCurrent;
};