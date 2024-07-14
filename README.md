# yaml-parser

yaml-parser convert yaml file to javascript object

I referred to the following link

https://codingchallenges.fyi/challenges/challenge-yaml

## type

Currently, only the following types are supported.

### object

```yaml
name: Coding Challenges
challenge:
  name: YAML Parser
```

```json
{
  "name": "Coding Challenges",
  "challenge": {
    "name": "YAML Parser"
  }
}
```


### number
```yaml
number: 1
```

```json
{
  "number": 1
}
```

### boolean

```yaml
isGood: true
isNotGood: false
```

```json
{
  "isGood": true,
  "isNotGood": false
}
```
### boolean

```yaml
isGood: true
isNotGood: false
```
```json
{
  "isGood": true,
  "isNotGood": false
}
```

### null
```yaml
good: null
```

```json
{
  "good": null
}
```

### >
```yaml
message: >
  this is an example
  yaml parser
```

```json
{
  "message": "this is an example\nyaml parser"
}
```
