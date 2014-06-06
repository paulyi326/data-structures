var makeBinarySearchTree = function(value){
  var bst = {};

  bst.value = value;

  bst.left = undefined;
  bst.right = undefined;

  bst._rebalance = function() {
    //Gets a sorted array and removes
    //all branches of the tree
    var values = bst._inOrderRemoval();

    //Get the middle value of the sorted array
    //Make that the new root of the tree
    var mid = Math.min((values.length - 1) / 2);
    bst.value = values[mid];

    //Continue adding the middle of each sub array
    //This will result in a well-balanced tree
    var q = [];
    q.push([0, mid -1]);
    q.push([mid + 1, values.length - 1]);
    while (q.length > 0) {
      var indices = q.shift();
      mid = Math.min((indices[0] + indices[1]) / 2);
      bst.insert(values[mid]);
      if (indices[0] <= mid - 1) {
        q.push([indices[0], mid - 1]);
      }
      if (mid + 1 <= indices[1]) {
        q.push([mid + 1, indices[1]]);
      }
    }

  };

  bst.contains = function(item) {
    if (bst.value === item) {
      return true;
    } else {
      if (item > bst.value) {
        if (bst.right === undefined) {
          return false;
        } else {
          return bst.right.contains(item);
        }
      } else {
        if (bst.left === undefined) {
          return false;
        } else {
          return bst.left.contains(item);
        }
      }
    }
  };
  bst.insert = function(item) {
    if (item > bst.value) {
      //add to the right branch
      if (bst.right === undefined) {
        var subtree = makeBinarySearchTree(item);
        bst.right = subtree;
      } else {
        bst.right.insert(item);
      }
    } else {
      //add to the left branch
      if (bst.left === undefined) {
        var subtree = makeBinarySearchTree(item);
        bst.left = subtree;
      } else {
        bst.left.insert(item);
      }
    }
  };

  bst.breadthFirstLog = function(iterator) {
    var q = [bst];
    while (q.length > 0) {
      var subTree = q.shift();
      if (subTree !== undefined) {
        q.push(subTree.left);
        q.push(subTree.right);
        iterator(subTree.value);
      }
    }
  };

  bst.depthFirstLog = function(iterator) {
    var recurseDfl = function(tree) {
      if (tree !== undefined) {
        iterator(tree.value);
        recurseDfl(tree.left);
        recurseDfl(tree.right);
      }
    };
    recurseDfl(bst);
  };

  //Removes all nodes from the tree
  //and returns a sorted array of all
  //values
  bst._inOrderRemoval = function() {
    var values = [];

    //traverse over all nodes in order,
    //save their values, then remove the nodes
    var recurseRemoval = function(tree) {
      if (tree !== undefined) {
        recurseRemoval(tree.left);
        values.push(tree.value);
        recurseRemoval(tree.right);

        //Removes nodes after traversing
        tree.left = undefined;
        tree.right = undefined;
      }
    };
    recurseRemoval(bst);

    //Remove the value for the root node
    //(at this point all other nodes are
    //already dead)
    bst.value = undefined;

    return values;
  };

  return bst;
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
