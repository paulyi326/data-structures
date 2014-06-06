var makeBinarySearchTree = function(value){
  var bst = {};

  bst.value = value;

  bst.left = undefined;
  bst.right = undefined;
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
  bst.depthFirstLog = function(iterator) {
    var recurseDfl = function(tree) {
      iterator(tree.value);
      if (tree.left !== undefined) {
        recurseDfl(tree.left);
      }
      if (tree.right !== undefined) {
        recurseDfl(tree.right);
      }
    };
    recurseDfl(bst);
  };

  return bst;
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
