const assert = require('assert')

describe('contentscript.js', function() {
  let random, fetch

  const replacements = {
    "Trump": ["Meat sack", "Chapati"],
    "Brexit": ["Bucket", "Banana"]
  }

  const randomValues = [0.1, 0.1, 0.9, 0.1, 0.1, 0.9, 0.1, 0.1, 0.9, 0.9]

  beforeEach(function() {
    fetch = window.fetch
    window.fetch = function() {
      return new Promise(function(resolve, reject) {
        resolve({ json: function() { return replacements } })
      })
    }
    random = Math.random
    Math.random = function() { return randomValues.shift() }
  })

  afterEach(function() {
    window.fetch = fetch
    Math.random = random
  })

  it('replaces text with random replacements', function() {
    var div = document.createElement('div')
    div.id = 'news'
    div.innerHTML = '<b>Trump, Brexit</b> Trump, Trump <span>Brexit, Brexit, Trump</span>'
    document.body.appendChild(div)
    require('../contentscript')

    return new Promise(function(resolve) {
      setTimeout(function() {
        assert.equal(document.querySelector('#news').innerHTML,
          '<b>Meat sack, Bucket</b> Chapati, Chapati <span>Banana, Banana, Meat sack</span>')
        resolve()
      }, 1)
    })
  })
})
