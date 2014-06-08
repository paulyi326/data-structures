var BTree = function(t) {
  //The "t" parameter should be set to place a min/max on node size
  this.t = t;
  this._maxKeys = 2*t - 1;
  this._minKeys = t - 1;

  //should have a keys property
  this.keys = [];

  //should have a parent property
  this.parent = undefined;

  //should have a children property
  this.children = [undefined, undefined];
};

//Internal method for inserting a key into the
//sorted keys property
BTree.prototype._sortedKeyInsert = function(key) {
  //The first loop could probably be made faster using
  //binary search (possible improvement for later)

  //Find out where the key should be inserted
  var newIndex = this.keys.length;
  for (var i=0; i<this.keys.length; i++) {
    if (key < this.keys[i]) {
      newIndex = i;
      break;
    }
  }

  //Shift all values in the key array to make room
  //for the new key
  for (var i=this.keys.length-1; i>=newIndex; i--) {
    this.keys[i+1] = this.keys[i];
  }

  //Now insert the new key
  this.keys[newIndex] = key;
};

//Internal method for re-sorting the children array (necessary when adding/removing values)
BTree.prototype._reSortChildren = function() {
  this.children.sort(function(a, b) {
    return a.keys[0] > b.keys[0];
  });
};

//Inserts a value to the tree
BTree.prototype.insert = function(key) {
  //If this tree has no children
  if (this.children[0] === undefined) {
    //If there is space in this tree
    if (this.keys.length < this._maxKeys) {
      //Insert the key in the key array (sorted)
      this._sortedKeyInsert(key);
    //else
    } else {
      //Get the middle key
      var middleIndex = (this.keys.length - 1)/2;
      var middle = this.keys[middleIndex];

      //Create new tree
      var leftTree = new BTree(this.t);

      //make it clear that we now have two sibling trees--one of the left, one on the right
      var rightTree = this;

      //insert the keys to left of the middle into
      //the new tree (also remove these keys from the original tree)
      for (var i = 0; i < middleIndex; i++) {
        leftTree._sortedKeyInsert(rightTree.keys.shift());
      }

      //Take out the middle value also
      rightTree.keys.shift();

      //If the incoming key is > middle
      if (key > middle) {
        //Insert it into the original tree's key array
        rightTree._sortedKeyInsert(key);
      //else
      } else {
        //Insert it into the new tree's key array
        leftTree._sortedKeyInsert(key);
      }

      //If this.parent is undefined (ie. This is the current root node and it is full)
      if (rightTree.parent === undefined) {
        //Create a new tree and add it to the parent property of the original tree
        var parent = new BTree(this.t);
        rightTree.parent = parent;
        leftTree.parent = parent;

        //Insert the "middle" key into the new parent tree
        rightTree.parent._sortedKeyInsert(middle);

        //Tell the parent tree that the new tree is its child
        leftTree.parent.children[0] = leftTree;

        //Tell the parent tree that the original tree is its child
        rightTree.parent.children[1] = rightTree;

      //else
      } else {
        //Call this insert function on the parent of the original tree
        rightTree.parent.insert(middle);

        //Update the new tree to have a parent property equal to the parent tree
        leftTree.parent = rightTree.parent;

        //Update the children array of the parent tree to also point to the new tree
        leftTree.parent.children.push(leftTree);

        //The parent's children array may need to be re sorted
        leftTree.parent._reSortChildren();
      }
    }

  //else
  } else {
    //Find out which child tree to insert the key into
    var childTree = this.children[this.children.length-1];
    for (var i=0; i<this.keys.length; i++) {
      if (key < this.keys[i]) {
        childTree = this.children[i];
        break;
      }
    }

    //Call insert on the next node down
    childTree.insert(key);
  }
};

//Removes the key from the tree
BTree.prototype.remove = function(key) {

};

//Checks if the tree contains the given key
BTree.prototype.contains = function(key) {
  return (this.retrieve(key) !== undefined);
};

//Retrieves a value from the tree
BTree.prototype.retrieve = function(key) {
  var bTree = this;

  //Make sure we're at root node before starting retrieval
  while (bTree.parent !== undefined) {
    bTree = bTree.parent;
  }

  //Now call the actual retrieve method
  return bTree._innerRetrieve(key);

};

BTree.prototype._innerRetrieve = function(key) {

  //Loop through all keys of current node
  for (var i=0; i<this.keys.length; i++) {
    var innerKey = this.keys[i];

    //If we match the key, return it
    if (key === innerKey ) {
      return key;
    } else {
      //If we reach a key greater than the passed-in key
      if (key < innerKey) {
        //If this node actually has children
        if (this.children[0] !== undefined) {
          //return the result of this method invoked on the child
          return this.children[i]._innerRetrieve(key);
        } else {
          //return undefined
          return undefined;
        }
      }
    }
  }

  //If here, means that the passed-in key is bigger than the last
  //key in the this.keys array, so return the result of this method
  //invoked on the last child
  if (this.children[0] === undefined) {
    return undefined;
  } else {
    return this.children[this.children.length-1]._innerRetrieve(key);
  }

};
