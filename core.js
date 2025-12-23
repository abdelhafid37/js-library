/**
 * @function doman
 * @param {*} selectors
 * @returns New nodes wrapper
 */
function doman(selectors) {
  return new JS(selectors);
}

const _ = doman; //? alias

// custom error class with location to spot the error
class JSError extends Error {
  constructor(message, location) {
    super(message);
    this.name = "JSError";
    this.location = location;
  }
}

/**
 * @class JS
 * @classdesc Wrapper of nodes
 * @returns {<newWrapper>|<valueOfSomeKind>}
 */
class JS {
  // private nodes array
  #nodes = [];

  constructor(selectors) {
    this.#resolve(selectors);
  }

  // helper methods
  #dedupe(nodes) {
    return [...new Set(nodes)];
  }

  // document binding to the querySelector (this)
  #grab = document.querySelectorAll.bind(document);

  // selectors resolver
  #resolve(selectors) {
    if (typeof document === "undefined" || !(document instanceof Document)) {
      throw new JSError("document is not defined or not a Document instance!", "constructor");
    }

    if (typeof selectors === "string") {
      this.#nodes = [...this.#grab(selectors)];
    } else if (selectors instanceof NodeList) {
      this.#nodes = [...selectors];
    } else if (selectors instanceof Element) {
      this.#nodes = [selectors];
    } else if (selectors instanceof Array) {
      this.#nodes = this.#dedupe(
        selectors.flatMap(selector => {
          if (typeof selector === "string") {
            return [...this.#grab(selector)];
          } else if (selector instanceof Element) {
            return [selector];
          } else {
            throw new JSError("Array of selectors contains unexpected items!", "constructor");
          }
        })
      );
    } else {
      throw new JSError("unexpected selector given, expects {String|NodeList|Element|Array{String|Element}}!", "constructor");
    }
  }

  // static factory
  static from(selectors) {
    return new JS(selectors);
  }

  // get nodes array length
  length() {
    return this.#nodes.length;
  }

  // get first node in nodes array
  first() {
    return [this.#nodes[0]];
  }

  // get last node in nodes array
  last() {
    return [this.#nodes.at(-1)];
  }

  // get specific node in nodes array by index
  pick(index) {
    if (isNaN(index)) throw new JSError(`pick() method expects an index number, ${typeof index} given!`, "pick()");

    if (index >= 0 && index < this.#nodes.length) {
      return [this.#nodes[index]];
    } else if (index < 0 && -index <= this.#nodes.length) {
      return [this.#nodes[this.#nodes.length + index]];
    } else {
      throw new JSError("the index you passed is out or range", "pick() method");
    }
  }

  // loop over every node in the nodes array
  each(func) {
    if (typeof func !== "function") throw new JSError(`each() method expects a function, ${typeof func} given!`, "each()");
    return this.#nodes.forEach(node => func(node));
  }

  // get the parent node of every node in the nodes array
  parent() {
    return this.#dedupe(this.#nodes.map(node => node.parentElement));
  }

  // get all children of each node in the nodes array
  children() {
    return this.#dedupe(this.#nodes.flatMap(node => node.children));
  }

  // set or get html value of each node of the nodes array
  html(value) {
    if (typeof value === "undefined") {
      return this.#nodes.map(node => node.innerHTML);
    } else {
      if (typeof value === "string") {
        this.each(node => (node.innerHTML = value));
      } else if (value instanceof Element) {
        this.each(node => node.appendChild(value));
      } else {
        throw new JSError(`the html value you're trying to pass is invalid, expects {string|Element}, ${typeof value} given`, "html() method");
      }

      return this.#nodes;
    }
  }
}

// seal the class prototype object to prevent changing the class content
Object.seal(JS.prototype);
