var $ = require('jquery');

// TODO - Make these configurable.
var options = {
    perPage: 2,
    indexes: 5
};

function updateIndexesUi (index, pages, $ui) {
    var $elements = $();

    if (pages > 0) {
        var rangeStart = index - Math.floor(options.indexes / 2);
        if ((rangeStart + options.indexes) >= pages) {
            rangeStart = pages - options.indexes - 1;
        }
        if (rangeStart < 1) {
            rangeStart = 1;
        }

        var i = rangeStart;
        while((i < (rangeStart + options.indexes)) && (i <= pages)) {
            var $button = $('<button class="button small"></button>').html(i);
            if (i !== index) {
                $button.addClass('hollow');
            }
            $elements = $elements.add($button);

            i++;
        }
    }
    else {
        $elements = $('<button class="button small hollow">...</button>');
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

module.exports = function filterBuild (context) {
    // TODO - Make these elements configurable.
    var $prev = context.$parent.find('.posts-prev');
    var $next = context.$parent.find('.posts-next');
    var $indexes = context.$parent.find('.posts-indexes');

    var pageIndex = 1;

    function update ($items) {
        // Cap the page index at it's max value.
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

        updateIndexesUi(pageIndex, pages, $indexes);
        updateNextPrevUi(pageIndex, pages, $prev, $next);
        return $items;
    }

    $prev.click(function () {
        if ($(this).hasClass('disabled')) return;

        pageIndex--;
        var $filtered = update(context.prev.pull());
        context.next.push($filtered);
    });

    $next.click(function () {
        if ($(this).hasClass('disabled')) return;

        pageIndex++;
        var $filtered = update(context.prev.pull());
        context.next.push($filtered);
    });

    // TODO - Click on indexes

    return update;
};