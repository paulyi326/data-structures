var makeSet = function(){
  var set = Object.create(setPrototype);
  set._storage = {};
  return set;
};

var setPrototype = {};

//Adds any object to the set (not just strings)
setPrototype.add = function(item){
  item = JSON.stringify(item);
  this._storage[item] = "Paul and Greg rule";
};

//Returns true if the given item is in the set
setPrototype.contains = function(item){
  item = JSON.stringify(item);
  return this._storage.hasOwnProperty(item);
};

//Removes the given item from the set
setPrototype.remove = function(item){
  item = JSON.stringify(item);
  delete this._storage[item];
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
