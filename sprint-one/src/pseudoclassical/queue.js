var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.

  this.front = 0;
  this.innerSize = 0;
  this.storage = {};

};

Queue.prototype.size = function() {
  return this.innerSize;
};

Queue.prototype.enqueue = function(value) {
  this.storage[this.front + this.innerSize] = value;
  this.innerSize++;
};

Queue.prototype.dequeue = function() {
  if (this.innerSize === 0) {
    return undefined;
  }
  var temp = this.storage[this.front];
  delete this.storage[this.front];
  this.front++;
  this.innerSize--;
  return temp;
};

