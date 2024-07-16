import { Token } from './Lexer';

export class YamlGraph {
  constructor(private depths: [[Record<string, any>, string, Token]]) {}

  private getLastIndex() {
    return this.depths.length - 1;
  }

  private getLastNode() {
    const [lastNode] = this.depths[this.getLastIndex()];
    return lastNode;
  }

  private getLast() {
    return this.depths[this.getLastIndex()];
  }

  get() {
    return this.depths[0][0];
  }

  toJsonString() {
    return JSON.stringify(this.get());
  }

  flatDepth(token: Token) {
    if (!token.key) {
      return;
    }

    while (this.depths.length > token.depth) {
      this.depths.pop();
    }
  }

  getLastedInsertedValue() {
    const [lastNode, lastNodeKey] = this.getLast();
    return lastNode[lastNodeKey];
  }

  addNode(token: Token) {
    const newObject = {};
    const lastNode = this.getLastNode();
    lastNode[token.key] = newObject;
    this.depths.push([newObject, token.key, token]);
  }

  addValueToLastNode(value: any) {
    const [lastNode, lastNodeKey] = this.getLast();
    lastNode[lastNodeKey] = value;
  }

  changeLastNodeToArray() {
    const [lastNode, lastKey, token] = this.getLast();

    if (!Array.isArray(lastNode[lastKey])) {
      this.depths.pop();
      const prevNode = this.getLastNode();
      prevNode[lastKey] = [];
      this.depths.push([
        Object.create(prevNode),
        lastKey,
        Object.create(token),
      ]);
    }
  }

  addArrayValue(value: any) {
    const [lastNode, lastKey] = this.getLast();
    lastNode[lastKey].push(value);
  }

  addValue(value: any, token: Token) {
    const lastNode = this.getLastNode();
    lastNode[token.key] = value;
  }

  modifyLastNodeKey(token: Token) {
    const keyIndex = 1;
    const lastNodeIndex = this.getLastIndex();
    this.depths[lastNodeIndex][keyIndex] = token.key;
  }
}
