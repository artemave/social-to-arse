fetch('https://make-news-great-again.herokuapp.com/')
  .then(function (response) {
    return response.json()
  })
  .then(function (replacements) {
    var walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: function(node) {
          //skip inputs and editable divs
          if (node.parentNode.nodeName.match(/INPUT|TEXTAREA/) || node.parentNode.isContentEditable) {
            return NodeFilter.FILTER_SKIP;
          }

          return true; //node.nodeValue.match(/social/i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
      }, false);

    while(node = walk.nextNode()) {
      Object.keys(replacements).forEach(function(key) {
        var replacementsForKey = replacements[key];

        var replacement = replacementsForKey[
          Math.floor(Math.random() * replacementsForKey.length)
        ];

        node.nodeValue = node.nodeValue.replace(key, replacement)
      })
    }
  })
