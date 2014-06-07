describe('prefixTree', function() {
  var prefixTree;
  var things = ['dog', 'cat', 'trampoline'];
  var t9ofThings = [[3,6,4],[2,2,8],[8,7,2,6,7,6,5,4,6,3]];

  beforeEach(function() {
    prefixTree = new PrefixTree();
  });

  it('should have methods named "insert", and "t9"', function() {
    expect(prefixTree.insert).to.be.a("function");
    expect(prefixTree.t9).to.be.a("function");
  });

  it('should be able to "t9" what was inserted', function() {
    for (var i=0; i<things.length; i++) {
      var thing = things[i];
      prefixTree.insert(thing);
      expect(prefixTree.t9(t9ofThings[i])[0]).to.equal(thing);
    }
  });

  it('should NOT be able to "t9" what was NOT inserted', function() {
    for (var i=0; i<things.length; i++) {
      var thing = things[i];
      expect(prefixTree.t9(t9ofThings[i])[0]).to.not.equal(thing);
    }
  });

});
