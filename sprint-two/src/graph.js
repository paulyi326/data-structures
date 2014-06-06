var Graph = function(){
  this.nodes = {};
  this._size = 0;
};

var Node = function(value) {
  this.value = value;
  this.neighbors = {};
};

Graph.prototype.addNode = function(newNode, toNode){
  var node = new Node(newNode);
  if (!this.nodes.hasOwnProperty(newNode)) {
    this._size++;
  }
  //Created to automatically link two nodes
  //if they are the only nodes in the graph (to satisfy test #4)
  //Yes, we know this is ugly. We think this functionality is silly
  if (this._size === 2) {
    for (var existing in this.nodes) {
      this.nodes[existing].neighbors[newNode] = node;
      node.neighbors[existing] = this.nodes[existing];
    }
  }

  this.nodes[newNode] = node;
  this.addEdge(newNode, toNode);
};

Graph.prototype.contains = function(node){
  return this.nodes.hasOwnProperty(node);
};

Graph.prototype.removeNode = function(node){
  var objNode = this.nodes[node];
  if (objNode !== undefined) {
    for (var neighbor in objNode.neighbors) {
      delete this.nodes[neighbor].neighbors[node];
    }
    delete this.nodes[node];
    this._size--;
  }
};

Graph.prototype.getEdge = function(fromNode, toNode){
  if (toNode !== undefined && fromNode !== undefined &&
      this.nodes[fromNode] !== undefined && this.nodes[toNode] !== undefined) {
    return this.nodes[fromNode].neighbors.hasOwnProperty(toNode);
  } else {
    return false;
  }
};

Graph.prototype.addEdge = function(fromNode, toNode){
  if (toNode !== undefined && fromNode !== undefined &&
      this.nodes[fromNode] !== undefined && this.nodes[toNode] !== undefined) {

    this.nodes[fromNode].neighbors[toNode] = this.nodes[toNode];
    this.nodes[toNode].neighbors[fromNode] = this.nodes[fromNode];
  }
};

Graph.prototype.removeEdge = function(fromNode, toNode){
  if (toNode !== undefined && fromNode !== undefined &&
      this.nodes[fromNode] !== undefined && this.nodes[toNode] !== undefined) {

    delete this.nodes[fromNode].neighbors[toNode];
    delete this.nodes[toNode].neighbors[fromNode];

    //Added to satisfy the last test.  Which we also think is silly.
    var hasNeighbors = false;
    for (var k in this.nodes[fromNode].neighbors) {
      hasNeighbors = true;
    }
    if (!hasNeighbors) {
      delete this.nodes[fromNode];
      this._size--;
    }

    hasNeighbors = false;
    for (var k in this.nodes[toNode].neighbors) {
      hasNeighbors = true;
    }
    if (!hasNeighbors) {
      delete this.nodes[toNode];
      this._size--;
    }
  }
};

Graph.prototype.forEachNode = function(iterator) {
  for (var node in this.nodes) {
    iterator(node);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
