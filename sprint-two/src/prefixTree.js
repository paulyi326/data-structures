var PrefixTree = function() {
  //Don't worry about it bro. It makes the T9 happen
  //But seriously...this just helps convert a letter into the number on your phone
  this._digitTextConvertArr = [2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,7,8,8,8,9,9,9,9];

  this.rootNodes = {};

};

var PrefixTreeNode = function(value) {
  //Stores the number
  this.value = value;

  //Stores the descendants
  this.children = {};

  //Stores the completed word as of this node (if any)
  this.words = [];

};

PrefixTree.prototype._convertLetterToNumber = function(letter) {
  return this._digitTextConvertArr[letter.toLowerCase().charCodeAt(0) - 97];
};

PrefixTree.prototype.t9 = function(numbers) {
  var node;

  var num = numbers[0].toString();

  //Get the appropriate root node
  if (num in this.rootNodes) {
    node = this.rootNodes[num];
  } else {
    //The numbers provided spell no words that are in the
    //tree
    return [];
  }

  //Loop until you are at the end of the number array
  //or until there are no children (in which case
  //the word you are spelling is not in the tree)
  for (var i=1; i<numbers.length; i++) {
    var num = numbers[i].toString();
    if (num in node.children) {
      node = node.children[num];
    } else {
      //The numbers provided spell no words that are in the
      //tree
      return [];
    }
  }

  //If the end of the number array ends up at a node
  //for which there are no completed words, continue down
  //the tree until a completed word is found--return the
  //first [numbers.length] digits of that word
  if (node.words.length === 0) {
    while (node.words.length === 0) {
      //get the first child node
      //note: this always ends with finding a completed word
      //because all leaf nodes in this tree should have at least
      //one complete word (all paths lead to at least one word)
      for (var nodeKey in node.children) {
        node = node.children[nodeKey];
        break;
      }
      //Return the first available word in an array
      //but only return the first [numbers.length] letters
      if (node.words.length > 0) {
        return node.words[0].slice(numbers.length-1);
      }
    }
  } else {
    return node.words;
  }
};

PrefixTree.prototype.insert = function(word) {
  //Creates a root node if necessary for the first converted
  //number in the string (the number for the first letter)
  var ch = word[0];
  var num = this._convertLetterToNumber(ch);
  if (!(num in this.rootNodes)) {
    this.rootNodes[num] = new PrefixTreeNode(num);
  }

  //Gets the right rootNode so we can start moving down the tree
  var node = this.rootNodes[num];

  //Loop through each letter in the word, moving down the tree
  //and adding nodes if necessary
  for (var i=1; i<word.length; i++) {
    var ch = word[i];
    var num = this._convertLetterToNumber(ch);
    if (!(num in node.children)) {
      var newNode = new PrefixTreeNode(num);
      node.children[num] = newNode;
    }

    //Go deeper into the rabbit hole
    node = node.children[num];
  }

  node.words.push(word);
};
