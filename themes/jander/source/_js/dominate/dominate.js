module.exports = function ($parent) {
    // Dominate only accepts a single parent object.
    if ($parent.length !== 1) {
        return;
    }

    // If there is already a dominate instance associated with this $parent,
    // return that instance.
    if ($parent.data('dominate')) {
        return $parent.data('dominate');
    }

    var $children = $parent.find('.list').children();
    if ($children.length === 0) {
        $children = $parent.children();
    }
    if ($children.length === 0) {
        return;
    }

    // THE FILTER CHAIN - Dominate works by hooking up a chain of filters to
    // pass the DOM elements through. Each filter has the chance to remove
    // elements from the running list before passing the list on to the next
    // filter. After the elements have passed through all the filters, the
    // ones who made it through will be displayed.

    // The first node in the filter chain.
    var firstNode = {
        pull: function () {
            return $children;
        }
    }

    // This functions builds a filter chain node. A function which builds the
    // filter must be passed in. Each filter chain node has a push and pull
    // function. The push function is called by the previous node when its
    // done processing the DOM element list. The pull function is called by
    // the next node when it wants a cache of the results form the last time
    // this filter ran.
    function buildFilterChainNode (buildFilter) {
        var $results;

        var node = {
            push: function ($items) {
                $results = this.filter($items);
                this.next.push($results);
            },
            pull: function () {
                return $results;
            },
            $parent: $parent
        };

        node.filter = buildFilter(node);
        return node;
    }

    // The last node in the filter chain.
    var lastNode = {
        push: function ($items) {
            if ($items.length > 0) {
                $children.hide();
                $items.show();
            }
        }
    }

    // The dominate instance
    var inst = {
        $parent: $parent,
        filterChain: [],
        addFilter: function (buildFilter) {
            var node = buildFilterChainNode(buildFilter);
            node.next = lastNode;
            
            var i = this.filterChain.push(node) - 1;

            if (i > 0) {
                node.prev = this.filterChain[i-1];
                this.filterChain[i-1].next = node;
            }
            else {
                node.prev = firstNode;
            }
        }
    };

    inst.addFilter(require('./dominate-search'));

    $parent.data('dominate', inst);
    return inst;
};