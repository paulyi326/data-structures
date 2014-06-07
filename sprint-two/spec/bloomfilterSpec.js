describe('bloomfilter', function() {
  var bloomfilter;
  var things = ['elephants', 'lions', 'trampolines', 'beer', 'cider', 'whiskey', 'birthday parties'];

  beforeEach(function() {
    bloomfilter = new Bloomfilter();
  });

  it('should have methods named "insert", and "contains"', function() {
    expect(bloomfilter.insert).to.be.a("function");
    expect(bloomfilter.contains).to.be.a("function");
  });

  it('should keep track of what was inserted', function() {
    for (var i=0; i<things.length; i++) {
      var thing = things[i];
      bloomfilter.insert(thing);
      expect(bloomfilter.contains(thing)).to.equal(true);
    }
  });

  it('should NOT keep track of what was NOT inserted (most of the time, except for false positives...)', function() {
    for (var i=0; i<things.length; i++) {
      var thing = things[i];
      expect(bloomfilter.contains(thing)).to.equal(false);
    }
  });

});
