var $ = require('jquery');
var _ = require('lodash');
var Fuse = require('fuse.js');

// Constants
var DE = 'dominate-search-entry';
var NAME = 'search';

var defaults = {
    shouldSort: false,
    threshold: 0.4,
    distance: 1000,
    tokenize: false
};

function buildDescriptor ($item) {
    var descriptor = '';

    // Get the name/value pairs from the children elements.
    $item.find('.data').each(function () {
        var value = $(this).attr('data-value');

        if (!value) {
            value = $(this).html();
        }

        if (value) {
            descriptor += value + ' ';
        }
    });

    // The slice removes the trailing space which was added by
    // the above loop.
    return descriptor.slice(0, -1);
}

function getDescriptor ($item) {
    var descriptor = $item.data(DE);
    if (descriptor === undefined) {
        descriptor = buildDescriptor($item);
        $item.data(DE, descriptor);
    }
    return descriptor;
}

exports.name = NAME;
exports.Filter = function (update, options) {
    _.defaults(options, defaults);
    var $input = options.$input;

    $input.keyup(update);

    return {
        process: function ($items) {
            var query = $input.val().trim();
            if (!query) {
                return $items;
            }

            var descriptors = [];
            $items.each(function () {
                descriptors.push(getDescriptor($(this)));
            });

            var $filtered = $();
            var f = new Fuse(descriptors, options);
            f.search(query).forEach(function (i) {
                $filtered = $filtered.add($items[i]);
            });
            return $filtered;
        },
        api: {
            search: function (query) {
                $input.val(query);
                update();
            }
        }
    };
};