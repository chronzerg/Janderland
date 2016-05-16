var $ = require('jquery');
var _ = require('lodash');

var defaults = {
    perPage: 10,
    indexes: 5
};

var NAME = "pages";

function updateIndexesUi (pageIndex, pages, indexes, $ui) {
    var $elements = $();

    if (pages > 0) {
        var rangeStart = pageIndex - Math.floor(indexes / 2);
        if ((rangeStart + indexes) >= pages) {
            rangeStart = pages - indexes - 1;
        }
        if (rangeStart < 1) {
            rangeStart = 1;
        }

        var i = rangeStart;
        while((i < (rangeStart + indexes)) && (i <= pages)) {
            var $button = $('<button class="button"></button>').html(i);
            if (i !== pageIndex) {
                $button.addClass('hollow');
            }
            $elements = $elements.add($button);

            i++;
        }
    }
    else {
        $elements = $('<button class="button hollow">...</button>');
    }

    $ui.empty();
    $ui.append($elements);
}

function updateNextPrevUi (index, pages, $prev, $next) {
    $prev.removeClass('disabled');
    $next.removeClass('disabled');

    if (index <= 1) {
        $prev.addClass('disabled');
    }

    if (index >= pages) {
        $next.addClass('disabled');
    }
}

exports.name = NAME;
exports.Filter = function (update, options) {
    _.defaults(options, defaults);

    var pageIndex = 1;

    function next () {
        if ($(this).hasClass('disabled')) return;

        pageIndex++;
        update();
    }

    function prev () {
        if ($(this).hasClass('disabled')) return;

        pageIndex--;
        update();
    }

    options.$next.click(next);
    options.$prev.click(prev);

    return {
        process: function ($items) {
            var pages = Math.ceil($items.length / options.perPage);

            if (pages > 0) {
                if (pageIndex > pages) pageIndex = pages;
                if (pageIndex < 1) pageIndex = 1;

                var rangeStart = (pageIndex-1)*options.perPage;
                var end = pageIndex*options.perPage;
                $items = $items.slice(rangeStart, end);
            }
            else {
                $items = $();
            }

            updateIndexesUi(pageIndex, pages, options.indexes, options.$indexes);
            updateNextPrevUi(pageIndex, pages, options.$prev, options.$next);
            return $items;
        },
        api: {
            prev: prev,
            next: next
        }
    };
};