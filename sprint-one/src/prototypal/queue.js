var makeQueue = function(){
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var q = Object.create(queueMethods);
  q.front = 0;
  q.innerSize = 0;
  q.storage = {};

  return q;
};

var queueMethods = {
  size: function() {
    return this.innerSize;
  },
  enqueue: function(value) {
    this.storage[this.front + this.innerSize] = value;
    this.innerSize++;
  },
  dequeue: function() {
    if (this.innerSize === 0) {
      return undefined;
    }
    var temp = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;
    this.innerSize--;
    return temp;
  }
};



