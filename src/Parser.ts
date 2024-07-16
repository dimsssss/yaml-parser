import { Token } from './Lexer';
import { TypeConverter } from './TypeConverter';
import { YamlGraph } from './YamlGraph';

export class Parser {
  typeConverter = new TypeConverter();
  yamlGraph = new YamlGraph([[{}, '', new Token('', '', '', '', 0)]]);

  constructor(private readonly tokens: Token[]) {}

  parse() {
    for (const token of this.tokens) {
      this.yamlGraph.flatDepth(token);

      if (this.typeConverter.isObject(token.key, token.value)) {
        this.yamlGraph.addNode(token);
      } else if (this.typeConverter.isValue(token.key, token.value)) {
        const value = this.typeConverter.concatString(
          this.yamlGraph.getLastedInsertedValue(),
          token,
        );
        this.yamlGraph.addValueToLastNode(value);
      } else if (this.typeConverter.isNumber(token.value)) {
        this.yamlGraph.addValue(
          this.typeConverter.toNumber(token.value),
          token,
        );
      } else if (this.typeConverter.isBoolean(token.value)) {
        this.yamlGraph.addValue(
          this.typeConverter.toBoolean(token.value),
          token,
        );
      } else if (this.typeConverter.isNull(token.value)) {
        this.yamlGraph.addValue(this.typeConverter.toNull(), token);
      } else if (
        this.typeConverter.isPipeString(token.value) ||
        this.typeConverter.isConcatString(token.value)
      ) {
        this.yamlGraph.modifyLastNodeKey(token);
        this.yamlGraph.addValue('', token);
      } else {
        this.yamlGraph.addValue(
          this.typeConverter.toString(token.originalValue),
          token,
        );
      }
    }
    return this.yamlGraph.get();
  }
}
