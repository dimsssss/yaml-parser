import { Token } from './lexer';

export class Parser {
  constructor(private readonly tokens: Token[]) {}

  private flatDepth(
    parsedType: [[Record<string, any>, string, Token]],
    token: Token,
  ) {
    while (parsedType.length > token.depth) {
      parsedType.pop();
    }
  }

  private isObject(token: Token) {
    return token.key && !token.value;
  }

  private isValue(token: Token) {
    return !token.key && token.value;
  }

  private isNumber(token: Token) {
    return !isNaN(Number(token.value));
  }

  private isBoolean(token: Token) {
    return token.value === 'true' || token.value === 'false';
  }

  private isNull(token: Token) {
    return token.value === 'null';
  }

  // string end with \n
  private isPipeString(token: Token) {
    return token.value === '|';
  }

  // string end without \n
  private isConcatString(token: Token) {
    return token.value === '>';
  }

  parse() {
    const root: [[Record<string, any>, string, Token]] = [
      [{}, '', new Token('', '', '', '')],
    ];

    for (const token of this.tokens) {
      if (token.key) {
        this.flatDepth(root, token);
      }

      const last = root.length - 1;
      const [parent, prevKey] = root[last];

      if (this.isObject(token)) {
        const newObject = {};
        parent[token.key] = newObject;
        root.push([newObject, token.key, token]);
        continue;
      } else if (this.isValue(token)) {
        parent[prevKey] += token.originalValue;
      } else if (this.isNumber(token)) {
        parent[token.key] = Number(token.value);
      } else if (this.isBoolean(token)) {
        parent[token.key] = Boolean(token.value);
      } else if (this.isNull(token)) {
        parent[token.key] = null;
      } else if (this.isPipeString(token) || this.isConcatString(token)) {
        root[last][1] = token.key;
        parent[token.key] = '';
      } else {
        parent[token.key] = token.originalValue.trim();
      }
    }
    return root[0][0];
  }
}
