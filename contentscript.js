fetch('https://make-news-great-again.herokuapp.com/')
  .then(function (response) {
    return response.json()
  })
  .then(function (replacements) {
    var keys = Object.keys(replacements)
    var keyRegex = new RegExp('(' + keys.join('|') + ')')
    var walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: function(node) {
          if (node.parentNode.nodeName.match(/INPUT|TEXTAREA/) || node.parentNode.isContentEditable) {
            return NodeFilter.FILTER_SKIP;
          }

          return node.nodeValue.match(keyRegex) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
      }, false);

    while(node = walk.nextNode()) {
      keys.forEach(function(key) {
        var replacementsForKey = replacements[key];

        var replacement = replacementsForKey[
          Math.floor(Math.random() * replacementsForKey.length)
        ];

        node.nodeValue = node.nodeValue.replace(new RegExp(key, 'g'), replacement)
      })
    }
  })
