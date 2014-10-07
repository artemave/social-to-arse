var walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function(node) {
      return node.nodeValue.match(/social/i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  }, false);

while(node = walk.nextNode()) {
  node.nodeValue = node.nodeValue.replace(/social/ig, function($match) {
      switch ($match) {
        case 'social':
          return 'arse';
        case 'Social':
          return 'Arse';
        case 'SOCIAL':
          return 'ARSE';
      }
  });
}
