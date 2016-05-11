var $ = require('jquery');

var options = {
    perPage: 10,
    indexes: 5
};

function updateUi(index, pages, $ui) {
    var rangeStart = index - Math.floor(options.indexes / 2);
    if ((rangeStart + options.indexes) >= pages) {
        rangeStart = pages - options.indexes - 1;
    }
    if (rangeStart < 1) {
        rangeStart = 1;
    }

    var i = rangeStart;
    var $elements = $();
    while((i < (rangeStart + options.indexes)) && (i <= pages)) {
        var $button = $('<button class="button"></button>').html(i);
        if (i !== index) {
            $button.addClass('hollow');
        }
        $elements = $elements.add($button);

        i++;
    }

    $ui.empty();
    $ui.append($elements);
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
        if (pageIndex > pages) pageIndex = pages;
        
        // Update the UI
        updateUi(pageIndex, pages, $indexes);

        var rangeStart = (pageIndex-1)*options.perPage;
        var end = pageIndex*options.perPage;
        return $items.slice(rangeStart, end);
    }

    return update;
};