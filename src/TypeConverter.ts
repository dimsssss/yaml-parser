import { Token } from './lexer';

export class TypeConverter {
  isObject(key: string, value: string) {
    return key && !value;
  }

  isValue(key: string, value: string) {
    return !key && value;
  }

  isNumber(value: string) {
    return !isNaN(Number(value));
  }

  isBoolean(value: string) {
    return value === 'true' || value === 'false';
  }

  isNull(value: string) {
    return value === 'null';
  }

  // string end with \n
  isPipeString(value: string) {
    return value === '|';
  }

  // string end without \n
  isConcatString(value: string) {
    return value === '>';
  }

  toNumber(value: string) {
    return Number(value);
  }

  toBoolean(value: string) {
    return value === 'true';
  }

  toNull() {
    return null;
  }

  concatString(prevString: string, token: Token) {
    return [prevString.trim(), token.originalValue.trim()].join(' ');
  }

  toString(value: string) {
    return value.trim();
  }
}
