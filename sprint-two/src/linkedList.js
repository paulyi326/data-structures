var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    //Create a new node object
    var node = makeNode(value);

    //If list is empty, make node the head
    if (list.head === null) {
      list.head = node;
    //Otherwise create the double links between
    //the current tail and the new node
    } else {
      node.previous = list.tail;
      list.tail.next = node;
    }
    //Update tail to be new node
    list.tail = node;
  };

  list.addToHead = function(value) {
    //If the head does not exist,
    //call addToTail
    if (list.head === null) {
      list.addToTail(value);
    //If head does exist...
    } else {
      //Create new node
      var node = makeNode(value);

      //Double link new node to current head
      list.head.previous = node;
      node.next = list.head;

      //Update head to be new node
      list.head = node;
    }
  };

  list.removeHead = function() {
    var result;
    //Only remove if a head actually exists
    if (list.head !== null) {
      //Save the value of the current head
      result = list.head.value;

      //Move the head to the next node
      list.head = list.head.next;

      //If the new head exists, remove its
      //link to the previous head
      if (list.head !== null) {
        list.head.previous = null;
      }
    }
    return result;
  };

  list.removeTail = function() {
    //Only do this is list is not empty
    var result;
    if (list.head !== null) {
      //Get result
      result = list.tail.value;

      //Make the 2nd-to-last node
      //the new tail
      list.tail = list.tail.previous;

      //If new tail exists, remove the new tail's
      //connection to the old tail
      if (list.tail !== null) {
        list.tail.next = null;
      }
    }
    return result;
  };

  list.contains = function(target){
    var current = list.head;
    while(current !== null) {
      if (current.value === target) {
        return true;
      }
      current = current.next;
    }
    return false;
  };

  return list;
};

var makeNode = function(value){
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
