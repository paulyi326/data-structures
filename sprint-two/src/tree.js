var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.children = undefined;
  newTree.addChild = treeMethods.addChild;
  newTree.contains = treeMethods.contains;
  return newTree;
};




var treeMethods = {};

treeMethods.addChild = function(value){
  var newTree = makeTree(value);
  if (this.children === undefined) {
    this.children = [];
  }
  this.children.push(newTree);
};

treeMethods.contains = function(target){
  if (this.value === target) {
    return true;
  }
  if (this.children === undefined) {
    return false;
  }
  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i];
    if (child.contains(target)) {
      return true;
    }
  }
  return false;
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
