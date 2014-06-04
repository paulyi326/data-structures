var makeQueue = function(){
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0;
  var head = 0;

  // Implement the methods below

  someInstance.enqueue = function(value){
    storage[head+size] = value;
    size++;
  };

  someInstance.dequeue = function(){
    if (size === 0) {
      return undefined;
    }
    var temp = storage[head];
    delete storage[head];
    head++;
    size--;
    return temp;
  };

  someInstance.size = function(){
    return size;
  };

  return someInstance;
};
