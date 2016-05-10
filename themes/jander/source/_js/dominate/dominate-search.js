var $ = require('jquery');
var f = require('fuse.js');

// Constants
var DE = 'dominate-search-entry';

// Options for Fuse.js
var foptions = {
    shouldSort: false,
    threshold: 0.4,
    distance: 1000,
    tokenize: false
};

// This function builds the descriptor string for each entry
// in the dominate instance. These strings are what this filter
// searches over.
function buildEntry ($item) {
    var entry = '';

    // Get the name/value pairs from the children elements.
    $item.find('.data').each(function () {
        var value = $(this).attr('data-value');

        if (!value) {
            value = $(this).html();
        }

        if (value) {
            entry += value + ' ';
        }
    });

    // The slice removes the trailing space which was added by
    // the above loop.
    return entry.slice(0, -1);
}

module.exports = function filterBuilder (context) {
    // TODO - Make this element configurable.
    var $search = context.$parent.find('.posts-search');

    function update ($items) {
        var query = $search.val();
        if (!query) {
            return $items;
        }

        var data = [];

        $items.each(function () {
            var entry = $(this).data(DE);
            if (!entry) {
                entry = buildEntry($(this));
                $(this).data(DE, entry);
            }
            data.push(entry);
        });

        var $filtered = $();
        var s = new f(data, foptions);
        s.search(query).forEach(function (i) {
            $filtered = $filtered.add($items[i]);
        });
        return $filtered;
    }

    // When someone enters something into the search box,
    // update the results.
    $search.keyup(function () {
        var $filtered = update(context.prev.pull());
        context.next.push($filtered);
    });

    return update;
};