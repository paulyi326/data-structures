describe('bTree', function() {
  var bTree;

  beforeEach(function() {
    bTree = new BTree(2);
  });

  it('should have methods named "insert", "contains", "remove", and "retrieve"', function() {
    expect(bTree.insert).to.be.a("function");
    expect(bTree.contains).to.be.a("function");
    expect(bTree.remove).to.be.a("function");
    expect(bTree.retrieve).to.be.a("function");
  });

  it('should have working insert and retrieve methods', function(){
    bTree.insert(2);
    bTree.insert(3);
    bTree.insert(7);
    bTree.insert(6);
    expect(bTree.retrieve(2)).to.equal(2);
    expect(bTree.retrieve(3)).to.equal(3);
    expect(bTree.retrieve(7)).to.equal(7);
    expect(bTree.retrieve(9)).to.equal(undefined);
  });

  it('should have a working "contains" method', function(){
    bTree.insert(2);
    bTree.insert(3);
    bTree.insert(7);
    expect(bTree.contains(7)).to.equal(true);
    expect(bTree.contains(8)).to.equal(false);
  });
  it('should have a working "remove" method', function() {
    bTree.insert(2);
    bTree.insert(3);
    bTree.insert(7);
    bTree.remove(7);
    bTree.remove(4);
    expect(bTree.contains(7).to.equal(false));
  });

});
