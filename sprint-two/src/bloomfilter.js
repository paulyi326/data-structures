var Bloomfilter = function() {

  this._storage = makeLimitedArray(18);
  this._appendString1 = "Paul and Greg are AWESOME!!!";
  this._appendString2 = "cat";

};

Bloomfilter.prototype.contains = function(value) {
  var hashValues = this._generateHashes(value);

  if (!this._storage.get(hashValues[0])) {
    return false;
  } else if (!this._storage.get(hashValues[1])) {
    return false;
  } else if (!this._storage.get(hashValues[2])) {
    return false;
  }
  return true;
};

Bloomfilter.prototype.insert = function(value) {
  var hashValues = this._generateHashes(value);

  this._storage.set(hashValues[0], true);
  this._storage.set(hashValues[1], true);
  this._storage.set(hashValues[2], true);
};

Bloomfilter.prototype._generateHashes = function(value) {
  value = JSON.stringify(value);
  var hashValues = [];
  hashValues.push(getIndexBelowMaxForKey(value, 18));
  hashValues.push(getIndexBelowMaxForKey(value + this._appendString1, 18));
  hashValues.push(getIndexBelowMaxForKey(value + this._appendString2, 18));
  return hashValues;
};
