var n, nodes=[],
walk=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function(node) {
      return node.nodeValue.match(/\bsocial\b/i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  }, false);

while(n=walk.nextNode()) nodes.push(n);

nodes.forEach(function(node) {
    node.nodeValue = node.nodeValue.replace(/\b([sS])ocial\b/g, function($match, $1) {
        return $1 == 's' ? 'arse' : 'Arse';
    });
});
