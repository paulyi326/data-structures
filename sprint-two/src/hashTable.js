var HashTable = function(){
  this._limit = 8;
  this._storage = makeLimitedArray(this._limit);
  this._size = 0;
  this._maxLoadFactor = .75;
  this._minLoadFactor = .25;
};

HashTable.prototype._checkLoadFactor = function() {
  var loadFactor = this._size / this._limit;
  if (loadFactor >= this._maxLoadFactor) {
    this._doubleStorage();
  } else if((loadFactor <= this._minLoadFactor) && (this._limit > 8)) {
    this._halveStorage();
  }

}

HashTable.prototype._adjustStorage = function(multiplier) {
  if (this._limit * multiplier >= 8) {
    var oldStorage = this._storage;
    this._limit = this._limit * multiplier;
    this._storage = makeLimitedArray(this._limit);
    var hashTable = this;
    oldStorage.each(function(separateChain) {
      if (separateChain !== undefined) {
        for (var i = 0; i < separateChain.length; i++) {
          var key = separateChain[i][0];
          var value = separateChain[i][1];
          hashTable._size--;
          hashTable.insert(key, value);
        }
      }
    });
  }
}

HashTable.prototype._doubleStorage = function() {
  this._adjustStorage(2);

}

HashTable.prototype._halveStorage = function() {
  this._adjustStorage(.5);
}

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(i) === undefined) {
    this._storage.set(i, []);
  }
  this._storage.get(i).push([k, v]);
  this._size++;
  this._checkLoadFactor();
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var separateChain = this._storage.get(i);
  if (separateChain === undefined) {
    return null;
  }
  for (var j = 0; j < separateChain.length; j++) {
    var key = separateChain[j][0];
    var value = separateChain[j][1];
    if (key === k) {
      return value;
    }
  }
  return null;
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var separateChain = this._storage.get(i);
  if (separateChain === undefined) {
    return;
  }
  var index = undefined;
  for (var j = 0; j < separateChain.length; j++) {
    var key = separateChain[j][0];
    var value = separateChain[j][1];
    if (key === k) {
      index = j;
      this._size--;
    }
  }
  // If given key is found, remove it by:
  // swapping with front element, then overwrite front element
  if (index !== undefined) {
    separateChain[index] = separateChain[0];
    separateChain.shift();
  }
  this._checkLoadFactor();
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
