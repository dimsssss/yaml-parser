export class Token {
  constructor(
    private readonly _originalKey: string,
    private readonly _originalValue: string,
    private readonly _key: string,
    private readonly _value: string,
  ) {}

  get originalKey() {
    return this._originalKey;
  }

  get originalValue() {
    return this._originalValue;
  }

  get key() {
    return this._key;
  }

  get value() {
    return this._value;
  }

  get depth() {
    return this._originalKey.split('  ').length;
  }
}

export class Lexer {
  private cuttingStr: string[];

  constructor(private readonly original: string) {
    this.cuttingStr = original.split('\n');
  }

  private validate() {
    this.hasOddDigitSpace();
  }

  private hasOddDigitSpace() {
    this.cuttingStr.forEach((str, index) => {
      const [key, value] = str.split(':');

      if (key && !value) {
        return;
      }

      const spaceCount = key.lastIndexOf(' ') + 1;

      if (spaceCount % 2 !== 0) {
        throw new Error(`space check before key at line ${index + 1}`);
      }
    });
  }

  init() {
    this.validate();
  }

  tokenizer() {
    return this.original
      .split('\n')
      .map((str: string) => str.split(':'))
      .filter((value: string[]) => !(value.length === 1 && !value[0]))
      .map((chunk) => {
        const [key, value] = chunk;

        if (chunk.length === 1) {
          return new Token('', key, '', key.replaceAll(' ', ''));
        }

        return new Token(
          key,
          value,
          key.replaceAll(' ', ''),
          value.replaceAll(' ', ''),
        );
      });
  }
}
