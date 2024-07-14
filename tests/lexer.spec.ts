import fs from 'fs/promises';
import { Lexer, Token } from '../src/lexer';

describe('lexer test', () => {
  let initYaml;
  let tokenYaml;

  beforeAll(async () => {
    const [initBuffer, tokenBuffer] = await Promise.all([
      fs.readFile('tests/file/init-fail.yaml', 'utf8'),
      fs.readFile('tests/file/token.yaml', 'utf8'),
    ]);

    initYaml = initBuffer.toString();
    tokenYaml = tokenBuffer.toString();
  });

  test('space should be even count before name keyword', async () => {
    const lexer = new Lexer(initYaml.toString());
    expect(() => lexer.init()).toThrow(Error);
  });

  test('should be return Tokens', async () => {
    const lexer = new Lexer(tokenYaml.toString());
    const [nameToken, numberToken] = lexer.tokenizer();

    expect(nameToken).toBeInstanceOf(Token);
    expect(nameToken.originalKey).toBe('name');
    expect(nameToken.key).toBe('name');
    expect(nameToken.originalValue).toBe('  token test file');
    expect(nameToken.value).toBe('tokentestfile');
    expect(numberToken).toBeInstanceOf(Token);
    expect(numberToken.originalKey).toBe('number');
    expect(numberToken.key).toBe('number');
    expect(numberToken.originalValue).toBe(' 1');
    expect(numberToken.value).toBe('1');
  });
});
