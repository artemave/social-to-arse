const assert = require('assert')

describe('contentscript.js', function() {
  let random, fetch

  const replacements = {
    "Trump": ["Minge", "Chapati"],
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
    div.innerHTML = '<b>Trump, Brexit</b> Brexit, Trump, Trump <b>Pants</b> <span>Brexit, <a>Brexit Trump</a>, Trump</span>'
    document.body.appendChild(div)
    require('../contentscript')

    return new Promise(function(resolve) {
      setTimeout(function() {
        assert.equal(document.querySelector('#news').innerHTML,
          '<b>Minge, Bucket</b> Banana, Minge, Minge <b>Pants</b> <span>Banana, <a>Bucket Minge</a>, Chapati</span>')
        resolve()
      }, 1)
    })
  })
})
