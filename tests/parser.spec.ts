import fs from 'fs/promises';
import { Lexer } from '../src/Lexer';
import { Parser } from '../src/Parser';

describe('parser test', () => {
  let objectYaml;
  let numberYaml;
  let booleanYaml;
  let nullYaml;
  let concatStringYaml;
  let stringYaml;
  let arrayYaml;
  let arrayValueYaml;

  beforeAll(async () => {
    const [
      objectBuffer,
      numberBuffer,
      booleanBuffer,
      nullBuffer,
      concatStringBuffer,
      stringBuffer,
      arrayBuffer,
      arrayValueBuffer,
    ] = await Promise.all([
      fs.readFile('tests/file/parser/object-parser.yaml', 'utf8'),
      fs.readFile('tests/file/parser/number-parser.yaml', 'utf8'),
      fs.readFile('tests/file/parser/boolean-parser.yaml', 'utf8'),
      fs.readFile('tests/file/parser/null-parser.yaml', 'utf8'),
      fs.readFile('tests/file/parser/concat-string-parser.yaml', 'utf8'),
      fs.readFile('tests/file/parser/string-parser.yaml', 'utf8'),
      fs.readFile('tests/file/parser/array-parser.yaml', 'utf8'),
      fs.readFile('tests/file/parser/array-value-parser.yaml', 'utf8'),
    ]);

    objectYaml = objectBuffer.toString();
    numberYaml = numberBuffer.toString();
    booleanYaml = booleanBuffer.toString();
    nullYaml = nullBuffer.toString();
    concatStringYaml = concatStringBuffer.toString();
    stringYaml = stringBuffer.toString();
    arrayYaml = arrayBuffer.toString();
    arrayValueYaml = arrayValueBuffer.toString();
  });

  test('parser should parse object', async () => {
    const lexer = new Lexer(objectYaml);
    const parser = new Parser(lexer.tokenizer());
    const result = parser.parse();

    expect(JSON.stringify(result)).toBe(
      `{"name":"YAML Parser","spec":{"name":{"type":"good"}}}`,
    );
  });

  test('parser should parse number', async () => {
    const lexer = new Lexer(numberYaml);
    const parser = new Parser(lexer.tokenizer());
    const result = parser.parse();

    expect(result.number).toBe(1);
    expect(JSON.stringify(result)).toBe(`{"number":1}`);
  });

  test('parser should parse boolean', async () => {
    const lexer = new Lexer(booleanYaml);
    const parser = new Parser(lexer.tokenizer());
    const result = parser.parse();

    expect(result.isGood).toBeTruthy();
    expect(result.isNotGood).toBeFalsy();
    expect(JSON.stringify(result)).toBe(`{"isGood":true,"isNotGood":false}`);
  });

  test('parser should parse null', async () => {
    const lexer = new Lexer(nullYaml);
    const parser = new Parser(lexer.tokenizer());
    const result = parser.parse();

    expect(result.good).toBeNull();
    expect(JSON.stringify(result)).toBe(`{"good":null}`);
  });

  test('parser should parse concat string', async () => {
    const lexer = new Lexer(concatStringYaml);
    const parser = new Parser(lexer.tokenizer());
    const result = parser.parse();

    expect(result.message).toBe('this is an example yaml parser');
    expect(JSON.stringify(result)).toBe(
      `{"message":"this is an example yaml parser"}`,
    );
  });

  test('parser should parse string', async () => {
    const lexer = new Lexer(stringYaml);
    const parser = new Parser(lexer.tokenizer());
    const result = parser.parse();

    expect(result.string).toBe('it is string');
    expect(JSON.stringify(result)).toBe(`{"string":"it is string"}`);
  });

  test('parser should parse array', async () => {
    const lexer = new Lexer(arrayYaml);
    const parser = new Parser(lexer.tokenizer());
    const result = parser.parse();

    expect(JSON.stringify(result)).toBe(
      `{"test":{"array":[1,2,3,null,true,false]}}`,
    );
  });

  test('parser should parse array value', async () => {
    const lexer = new Lexer(arrayValueYaml);
    const parser = new Parser(lexer.tokenizer());
    const result = parser.parse();

    expect(JSON.stringify(result)).toBe(
      `{"test":{"array":[1,2,3,null,true,false]}}`,
    );
  });
});
