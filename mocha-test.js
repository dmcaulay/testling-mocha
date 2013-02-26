
var mocha = require('./mocha-harness')
var assert = require('assert')

mocha.setup()

describe('test woooo', function () {
  it('should pass', function (done) {
    assert(true)
    done()
  })
    
  it('should do some things', function (done) {
    var arr = [1,2,3]
    assert(-1 == arr.indexOf(5))
    setTimeout(done, 10000)
  })
})

describe('test number two', function () {
  it('whatever', function (done) {
    assert(true)
    done()
  })
})

mocha.run()

