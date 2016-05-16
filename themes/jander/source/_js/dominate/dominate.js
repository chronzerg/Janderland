var $ = require('jquery');

// Constants
var DO = 'dominate';

// THE FILTER CHAIN - Dominate works by hooking up a chain of filters to
// pass the DOM elements through. Each filter has the chance to remove
// elements from the running list before passing the list on to the next
// filter. After the elements have passed through all the filters, the
// ones who made it through will be displayed.

function NullNode () {
    this.push = function () {};
    this.pull = function () { return $(); };
    this.next = this;
    this.prev = this;
}

function ChainNode (Filter, options) {
    var self = this;
    var $filtered;
    var filter;

    this.next = new NullNode();
    this.prev = new NullNode();

    this.push = function ($items) {
        $filtered = filter.process($items);
        this.next.push($filtered);
    };

    this.pull = function () {
        return $filtered;
    };

    filter = new Filter(function update () {
        var $items = self.prev.pull();
        self.push($items);
    }, options);

    this.api = filter.api;
}

function FirstNode ($items) {
    this.pull = function () {
        return $items;
    };
}

function LastNode ($root) {
    var $items = $root.children();
    this.push = function ($filtered) {
        $items.detach();
        $filtered.appendTo($root);
    }
}

function Dominate ($root) {
    var $items = $root.children()
    filterChain = [];

    var firstNode = new FirstNode($items);
    var lastNode = new LastNode($root);

    this.filterApis = {};

    this.addFilter = function (filterModule, options, updateNow) {
        var node = new ChainNode(filterModule.Filter, options);
        node.next = lastNode;
        
        var i = filterChain.push(node) - 1;

        if (i > 0) {
            node.prev = filterChain[i-1];
            filterChain[i-1].next = node;
        }
        else {
            node.prev = firstNode;
        }

        if (updateNow || updateNow === undefined) {
            this.update();
        }

        this.filterApis[filterModule.name] = node.api;
        return node.api;
    };

    this.update = function () {
        if (filterChain.length) {
            filterChain[0].push($items);
        }
    };
}

module.exports = function ($root) {
    if ($root.length !== 1) {
        return;
    }

    if ($root.data(DO)) {
        return $root.data(DO);
    }

    var inst = new Dominate($root);
    $root.data(DO, inst);

    return inst;
};