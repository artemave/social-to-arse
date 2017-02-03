fetch('https://make-news-great-again.herokuapp.com/replacements.json')
  .then(function (response) {
    return response.json()
  })
  .then(function (replacements) {
    var keys = Object.keys(replacements)
    var keyPattern = '(?:' + keys.map(function(k) { return '(' + k + ')'}).join('|') + ')'
    var keyRegex = new RegExp(keyPattern)
    var walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: function(node) {
          return node.parentNode.nodeName.match(/INPUT|TEXTAREA|SCRIPT/) || node.parentNode.isContentEditable ?
            NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
        }
      }, false);

    while(node = walk.nextNode()) {
      var reg = new RegExp(keyPattern, 'g')
      var m
      var value = node.nodeValue
      while ((m = reg.exec(value)) !== null) {
        for (var i = 1; i < m.length; i++) {
          if (m[i]) {
            var key = m[i];
            var replacementsForKey = replacements[key];
            var replacement = replacementsForKey[
              Math.floor(Math.random() * replacementsForKey.length)
            ];
            node.nodeValue = node.nodeValue.replace(new RegExp(key, 'g'), replacement)
            break
          }
        }
      }
    }
  })
