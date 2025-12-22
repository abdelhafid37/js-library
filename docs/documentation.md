$$doman-v0.0.1$$

**Overview**

A typical javascript library inspired by Jquery made for manipulating the dom directly, It uses shorthands method chaining to preform action on dom nodes with so no setup needed just plug and run that what's makes it Easy to use with raw HTML.

---

**How it works**

It create a new instance of a wrapper class that holds the nodes collected inside an array, therefor other methods either can iterate over them to makes changes and return the wrapper itself otherwise return a value.

```javascript
{ NodeList|Array|Element|String } => [node1,node2,...] => // iterate over these nodes
[node1,node2,...].sideEffectMethod() => [node1,node2,...] => // return same wrapper
[node1,node2,...].getMethod() => <valueOfSomeKind> => // return a value
```
