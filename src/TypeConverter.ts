import { Token } from './Lexer';

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

  isArray(value: string) {
    return value[0] == '[' && value[value.length - 1] === ']';
  }

  isArrayValue(value: string) {
    const prefix = value.trim().split(' ');
    return prefix[0] === '-';
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

  toArray(value: string) {
    return value
      .substring(1, value.length - 1)
      .split(',')
      .map(this.toPrimitiveValue.bind(this));
  }

  toPrimitiveValue(value: string) {
    if (value.includes('-')) {
      const [, arrayValue] = value.trim().split('-');
      value = arrayValue.trim();
    }

    if (this.isBoolean(value)) {
      return this.toBoolean(value);
    } else if (this.isNumber(value)) {
      return this.toNumber(value);
    } else if (this.isNull(value)) {
      return this.toNull();
    }

    throw new Error('not support value');
  }

  concatString(prevString: string, token: Token) {
    return [prevString.trim(), token.originalValue.trim()].join(' ');
  }

  toString(value: string) {
    return value.trim();
  }
}
