var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  //
  //

  this.innerSize = 0;
  this.storage = {};
};

Stack.prototype.size = function() {
  return this.innerSize;
};

Stack.prototype.push = function(value) {

  this.storage[this.innerSize] = value;
  this.innerSize++;

};
Stack.prototype.pop = function() {
  if (this.innerSize === 0) {
    return undefined;
  }
  this.innerSize--;
  var temp = this.storage[this.innerSize];
  delete this.storage[this.innerSize];
  return temp;
};
