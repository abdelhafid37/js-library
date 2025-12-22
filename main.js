/**
 * @function doman
 * @param {*} selectors
 * @returns New nodes wrapper
 */
function doman(selectors) {
  return new JS(selectors);
}

const _ = doman; //? shorthand

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
  #nodes = [];

  constructor(selectors) {
    this.#resolve(selectors);
  }

  // helper methods
  #dedupe = nodes => [...new Set(nodes)];
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
      throw new JSError("Unexpected selector given, expects {String|NodeList|Element|Array{String|Element}}!", "constructor");
    }
  }
}
