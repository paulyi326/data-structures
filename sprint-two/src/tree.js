var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.children = undefined;
  newTree.parent = undefined;

  newTree.addChild = treeMethods.addChild;
  newTree.contains = treeMethods.contains;
  newTree.removeFromParent = treeMethods.removeFromParent;
  newTree.traverse = treeMethods.traverse;

  return newTree;
};

var treeMethods = {};

//Executes a function on every value in the tree
treeMethods.traverse = function(iterator) {
  iterator(this.value);
  if (this.children !== undefined) {
    for (var i=0; i<this.children.length; i++) {
      this.children[i].traverse(iterator);
    }
  }
};

//Severs the connection between the tree's parent
//and the tree (in both directions)
treeMethods.removeFromParent = function() {
  //Save the current tree's parent
  var parent = this.parent;

  //Get the index of the child tree in the
  //parent tree's children list
  var removeIndex;
  for (var i = 0; i < parent.children.length; i++) {
    var child = parent.children[i];
    if (child === this) {
      //Cut connection between parent and child
      //from the parent's side
      removeIndex = i;
      break;
    }
  }

  //Remove the child from the parent's children array
  parent.children[i] = parent.children[0];
  parent.children.shift();
};

//Create a new tree object and add it as a child
//of the parent tree
treeMethods.addChild = function(value){
  //Create a new tree object
  var newTree = makeTree(value);

  //Add the new tree object to the children
  //array of the parent tree
  if (this.children === undefined) {
    this.children = [];
  }
  this.children.push(newTree);

  //Tell the new tree about its parent
  newTree.parent = this;

  //Return a reference to the child tree
  //that just got added (necessary for removeFromParent
  //to be relevant, but not technically part
  //of the requirements)
  return newTree;
};

//Returns true if tree contains target, otherwise
//returns false
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
