var makeStack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var stack = {};

  stack.innerSize = 0;
  stack.storage = {};

  stack.size = stackMethods.size;
  stack.push = stackMethods.push;
  stack.pop = stackMethods.pop;

  return stack;
};

var stackMethods = {
  size: function() {
    return this.innerSize;
  },
  push: function(value) {

    this.storage[this.innerSize] = value;
    this.innerSize++;

  },
  pop: function() {
    if (this.innerSize === 0) {
      return undefined;
    }
    this.innerSize--;
    var temp = this.storage[this.innerSize];
    delete this.storage[this.innerSize];
    return temp;

  }

};


