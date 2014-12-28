var walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function(node) {
      //skip inputs and editable divs
      if (node.parentNode.nodeName.match(/INPUT|TEXTAREA/) || node.parentNode.isContentEditable) {
        return NodeFilter.FILTER_SKIP;
      }

      return node.nodeValue.match(/social/i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  }, false);

while(node = walk.nextNode()) {
  node.nodeValue = node.nodeValue.replace(/(\ba )?(social)/ig, function($0, $1, $2) {
      var article = '';

      if ($1) {
        article = $1 == 'a ' ? 'an ' : 'An ';
      }

      switch ($2) {
        case 'social':
          return article + 'arse';
        case 'Social':
          return article + 'Arse';
        case 'SOCIAL':
          return article + 'ARSE';
      }
  });
}
