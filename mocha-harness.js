
var shoe = require('shoe')
var stream = shoe('/push')

var push = function(obj) {
  stream.write(JSON.stringify({log: obj}))
}

function Reporter(runner) {
  Mocha.reporters.Base.call(this, runner)

  var n = 1

  runner.on('suite', function(suite) {
    if (!suite.title) return
    push(suite.title)
  })

  runner.on('test end', function() {
    ++n
  })

  runner.on('pending', function(test) {
    push({
      id: n,
      ok: true,
      name: title(test) + ' # SKIP -'
    })
  })

  runner.on('pass', function(test) {
    push({
      id: n,
      ok: true,
      name: test.fullTitle()
    })
  })

  runner.on('fail', function(test, err) {
    push({
      id: n,
      ok: false,
      name: test.fullTitle(),
      stack: err.stack
    })
  })

  runner.on('end', function() {
    stream.end()
  })
}

module.exports = {
  setup: function() {
    mocha.setup({ui:'bdd',reporter:Reporter})
  },
  run: function() {
    mocha.run()
  }
}

